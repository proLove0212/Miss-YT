// @flow
import type {TUser} from '../User';
import type {TAction} from './index';

export type TDefaultUser = {
  item: TUser,
  isForgotPassword: boolean,
  isFetching: boolean,
  errorMessage: string,
}

export type TUserAuthenticateAction = TAction & {
  email: string, password: string,
}
export type TUserUpdateProfileAction = TAction & {
  updates: {displayName?: string, photoURL?: string}
}

export type TAuthenticate = (email: string, password: string) => any;
export type TUserUpdateProfile = (updates: {displayName?: string, photoURL?: string}) => any

export type TUserActions = {
  userRequest: () => any,
  userLogin: TAuthenticate,
  userCreate: TAuthenticate,
  userSuccess: (item: TUser) => any,
  userFailure: (errorMessage: string) => any,
  userUpdateProfile: TUserUpdateProfile,
  userSendEmailVerification: () => any,
  userReload: () => any,
  userSwitchForgotPassword: () => any,
  userSendPasswordResetEmail: (email: string) => any,
}
