// @flow
import {REHYDRATE} from 'redux-persist/constants';
import { omit } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {PER_PAGE} from '../../constants';
import type {TDefaultLikedChannels, TLikedChannelsActions, TChannel, TLike, TChannelStoreWithKey} from '../../types/';
import {likesPostActions, likesPostReducer} from '../likesPost';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  likedChannelsRequest: ['startAt'],
  likedChannelsSuccess: ['items'],
  likedChannelsFailure: ['errorMessage'],
  likedChannelsChanged: ['item'],
  likedChannelsRemoved: ['item'],
  likedChannelsSetContentHeight: ['contentHeight'],
  likedChannelsPaginate: null,
  likesChanged: ['snapshot'],
  likesChangedSuccess: ['item'],
  ...likesPostActions('likedChannels'),
});
export const likedChannelsTypes = Types;
export const likedChannelsActions: TLikedChannelsActions = Creators;

/* ------------- Initial State ------------- */

const defaultLikedChannels: TDefaultLikedChannels = {
  items: {},
  isFetching: false,
  errorMessage: '',
  contentHeight: 0,
  startAt: 1,
};
export const DEFAULT_LIKED_CHANNELS = Immutable(defaultLikedChannels);

/* ------------- Reducers ------------- */

export const likedChannelsReducer = createReducer(DEFAULT_LIKED_CHANNELS, {
  [Types.LIKED_CHANNELS_REQUEST]: (state: Object) =>
    state.merge({ isFetching: true, errorMessage: '' }),
  [Types.LIKED_CHANNELS_SUCCESS]: (
    state: Object,
    { items }: {items: TChannelStoreWithKey},
  ) => {
    const newItem = state.items.merge(items);
    return state.merge({
      isFetching: false,
      errorMessage: '',
      items: newItem,
    }, {deep: true});
  },
  [Types.LIKED_CHANNELS_PAGINATE]: (state: Object) =>
    state.merge({ startAt: state.startAt + PER_PAGE }),
  [Types.LIKED_CHANNELS_FAILURE]: (state: Object, { errorMessage }: {errorMessage: string}) =>
    state.merge({ isFetching: false, errorMessage }),
  [Types.LIKED_CHANNELS_CHANGED]: (state: Object, { item }: {item: TChannel}) => {
    const i = omit(item, ['rank', 'likeCount']);
    return state.merge({items: {[i.id]: i}}, {deep: true});
  },
  [Types.LIKED_CHANNELS_REMOVED]: (state: Object, { item }: {item: TChannel}) => {
    const newItem = state.items.without(item.id);
    return state.merge({items: newItem});
  },
  [Types.LIKES_CHANGED_SUCCESS]: (state: Object, { item }: {item: TLike}) => {
    if (item.rank === 0) {
      return state.merge({items: {[item.channelId]: {
        likeCount: item.count,
      }}}, {deep: true});
    }
    return state.merge({items: {[item.channelId]: {
      rank: item.rank,
      likeCount: item.count,
    }}}, {deep: true});
  },
  [Types.LIKED_CHANNELS_SET_CONTENT_HEIGHT]: (state: Object, {contentHeight}: Object) =>
    state.merge({ contentHeight }),
  [REHYDRATE]: (state: Object, {payload: {likedChannels}}) => {
    if (!likedChannels) {
      return state;
    }
    return state.merge([likedChannels, {
      isFetching: false,
      errorMessage: '',
      contentHeight: 0,
      startAt: 1,
    }]);
  },
  ...likesPostReducer('LIKED_CHANNELS'),
});
