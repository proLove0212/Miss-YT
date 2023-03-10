// @flow
import test from 'ava-spec';
import { call, put } from 'redux-saga/effects';

import { userActions } from '../../Redux/';
import { loginWithFirebase, authenticate } from './authenticate';
import { statusCode, sendEmailVerificationWithFirebase } from '../../Services/';

const actionMock = {
  type: 'type',
  email: 'email',
  password: 'password',
};

test.serial.group('Normal', () => {
  const generator = authenticate(loginWithFirebase, actionMock);

  test('could set the requesting status to `redux store`', (t) => {
    t.deepEqual(
      generator.next().value,
      put(userActions.userRequest()),
    );
  });

  test('could make a request to authenticate', (t) => {
    t.deepEqual(
      generator.next().value,
      call(loginWithFirebase, actionMock),
    );
  });

  test('could send email verification', (t) => {
    t.deepEqual(
      generator.next({
        status: statusCode.Ok,
        message: '',
      }).value,
      call(sendEmailVerificationWithFirebase),
    );
  });

  test('could finish `generator`', (t) => {
    t.deepEqual(
      generator.next().done,
      true,
    );
  });
});

test.serial.group('Abnormal', () => {
  const generator = authenticate(loginWithFirebase, actionMock);

  test('could catch the error for authentication', (t) => {
    generator.next();
    generator.next();
    t.deepEqual(
      generator.next({status: statusCode.InternalError, message: 'error'}).value,
      put(userActions.userFailure('error')),
    );
    t.deepEqual(generator.next().done, true);
  });
});
