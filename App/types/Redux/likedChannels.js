// @flow
import type {TDefaultChannels} from './channels';
import type {TChannelStore, TChannel} from '../channel';
import type {TLike} from '../like';

export type TDefaultLikedChannels = TDefaultChannels

export type TLikedChannelsLikesPostActions = {
  likedChannelsLikesPostRequest: (channel: TChannelStore) => void,
  likedChannelsLikesPostIncrease: (channelId: string) => void,
}

export type TLikedChannelsActions = TLikedChannelsLikesPostActions & {
  likedChannelsRequest: () => void,
  likedChannelsSuccess: (item: {[key: string]: TChannelStore}) => void,
  likedChannelsFailure: (errorMessage: string) => void,
  likedChannelsChanged: (channel: TChannel) => any,
  likedChannelsRemoved: (channel: TChannel) => any,
  likedChannelsSetContentHeight: (height: number) => void,
  likedChannelsPaginate: () => void,
  likesChanged: (snapshot: any) => void,
  likesChangedSuccess: (item: TLike) => void,
  likesSync: () => void,
}
