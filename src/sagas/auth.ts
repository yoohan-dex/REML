import { call, fork, put, race, take } from 'redux-saga/effects';
import * as auth from '../api/auth';
// import * as Actions from 'actions/async/actions';
import * as actionCreator from 'actions/async/actionCreator';
import * as constants from 'actions/async/constants';
import * as actions from 'actions/async/actions';

export interface SignInResponse {
  _id: string;
  email: string;
  username: string;
  access_token: string;
}

export function* logout() {
  yield put(actionCreator.sendingRequest(true));

  try {
    yield call(auth.logout);
    yield put(actionCreator.sendingRequest(false));

  } catch (e) {
    yield put(actionCreator.requestError(e));
  }
}

export function* signInFlow() {
  while (true) {
    try {
      const req: actions.SignIn = yield take(constants.SIGN_IN);

      const winner = yield race({
        auth: call(auth.signIn, req.payload),
        logout: take(constants.LOGOUT),
      });

      if (winner.auth) {
        const resp: SignInResponse = winner.auth.data;
        yield auth.setAuth(resp.access_token);
        yield put(actionCreator.signInSuccess(resp.username));

      }
    } catch (e) {
      yield put(actionCreator.requestError(e.response.data.message));
    }
  }
}

export function* signUpFlow() {
  while (true) {
    try {
      let req: actions.SignUp = yield take(constants.SIGN_UP);
      let isSuccessful = yield call(auth.signUp, req.payload);
      if (isSuccessful) {
        yield signInFlow();
      }
    } catch (e) {
      yield put(actionCreator.requestError(e.response.data));
    }
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(constants.LOGOUT);
  }
}

export default function* loginFlow() {
  yield fork(signInFlow);
  yield fork(signUpFlow);
  yield fork(logoutFlow);
}