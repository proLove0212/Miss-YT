import { takeLatest } from 'redux-saga';
import { CHANNEL_MY_INFO, CHANNEL_VIDEOS } from '../constants';

/* ------------- Types ------------- */

import { channelsTypes, userTypes, likedChannelsTypes, channelTypes } from '../Redux/';
import { StartupTypes } from '../Redux/StartupRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { channelMyInfoGet, channelVideosGet } from './channel';
import { getChannels } from './channels';
import { getLikedChannels } from './likedChannels';
import { likesPostIncrease, likesSync } from './likesPost';
import { login, createUser, updateProfile, sendEmailVerification, reload, sendPasswordResetEmail } from './UserSagas';
import { likesChanged } from './subscribe';

/* ------------- RootSaga ------------- */

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(channelTypes[CHANNEL_MY_INFO.GET.REQUEST], channelMyInfoGet),
    takeLatest(channelTypes[CHANNEL_VIDEOS.GET.REQUEST], channelVideosGet),
    takeLatest(channelsTypes.CHANNELS_REQUEST, getChannels),
    takeLatest(channelsTypes.CHANNELS_LIKES_POST_REQUEST, likesPostIncrease),

    takeLatest(likedChannelsTypes.LIKED_CHANNELS_REQUEST, getLikedChannels),
    takeLatest(likedChannelsTypes.LIKED_CHANNELS_LIKES_POST_REQUEST, likesPostIncrease),
    takeLatest(likedChannelsTypes.LIKES_CHANGED, likesChanged),
    takeLatest(likedChannelsTypes.LIKES_SYNC, likesSync),

    takeLatest(userTypes.USER_LOGIN, login),
    takeLatest(userTypes.USER_CREATE, createUser),
    takeLatest(userTypes.USER_UPDATE_PROFILE, updateProfile),
    takeLatest(userTypes.USER_SEND_EMAIL_VERIFICATION, sendEmailVerification),
    takeLatest(userTypes.USER_RELOAD, reload),
    takeLatest(userTypes.USER_SEND_PASSWORD_RESET_EMAIL, sendPasswordResetEmail),
  ];
}
