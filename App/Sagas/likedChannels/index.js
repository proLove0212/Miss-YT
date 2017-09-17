// @flow
import Promise from 'bluebird';
import { assign } from 'lodash';
import { call, put, select, fork } from 'redux-saga/effects';

import type {TChannel, TChannelStore, APIResponse, TRootState, TLike} from '../../types/';
import {PER_PAGE} from '../../constants';
import {likedChannelsActions} from '../../Redux/';
import {likesRef, channelsRef, isSuccess, channelStoreArrayToActiveObject, firebaseServiceResponse} from '../../Services/';
import {syncLikes} from '../likesPost';

export const getStartAt = (state: TRootState) => state.likedChannels.startAt;

export const getLikesFromFirebase = (userId: string, startAt: number) => {
  return firebaseServiceResponse(
      likesRef
        .child(userId)
        .orderByChild('rank')
        .startAt(startAt)
        .limitToFirst(PER_PAGE)
        .once('value'),
    );
};

const getChannel = (channelId: string): Promise<Array<TChannelStore>> => {
  return firebaseServiceResponse(channelsRef.orderByChild('id').equalTo(channelId).once('value'));
};

export const getChannels = (snapshot: any): Array<Promise<TChannelStore>> => {
  const promises = [];
  snapshot.forEach((s) => {
    const like: TLike = s.val();
    const promise = getChannel(like.channelId)
      .then((responce: APIResponse): TChannelStore => {
        if (!isSuccess(responce)) {
          throw responce;
        }
        const channel: TChannel = responce.snapshot.val();
        return assign({}, channel, {
          isLiked: true,
          rank: like.rank,
          likeCount: like.count,
        });
      })
      .catch(() => {
        return {status: 'inactive'};
      })
      ;
    promises.push(promise);
  });
  return promises;
};

export function* getLikedChannels<T>(): Generator<T, any, any> {
  const startAt = yield select(getStartAt);
  const responce: APIResponse = yield call(getLikesFromFirebase, startAt);
  if (!isSuccess(responce)) {
    yield put(likedChannelsActions.likedChannelsFailure());
    return;
  }
  const channelsPromise: Array<Promise<TChannelStore>> = yield call(getChannels, responce.snapshot);
  const channelsArray: TChannelStore[] = yield call(Promise.all, channelsPromise);
  const channels: {[key: string]: TChannelStore} = channelStoreArrayToActiveObject(channelsArray);
  yield fork(syncLikes, channels);
  yield put(likedChannelsActions.likedChannelsSuccess(channels));
}