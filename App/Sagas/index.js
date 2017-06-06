import { takeLatest } from 'redux-saga';

/* ------------- Types ------------- */

import { channelsTypes, userTypes } from '../Redux/';
import { StartupTypes } from '../Redux/StartupRedux';
import { LoginTypes } from '../Redux/LoginRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { login as legacyLogin } from './LoginSagas';
import { getChannels } from './ChannelsSagas';
import { login, createUser } from './UserSagas';

/* ------------- RootSaga ------------- */

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, legacyLogin),
    takeLatest(channelsTypes.CHANNELS_REQUEST, getChannels),
    takeLatest(userTypes.USER_LOGIN, login),
    takeLatest(userTypes.USER_CREATE, createUser),
  ];
}
