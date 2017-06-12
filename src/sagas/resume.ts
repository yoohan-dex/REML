import { call, fork, put, take } from 'redux-saga/effects';
import * as actionCreator from 'actions/async/actionCreator';
import * as constants from 'actions/async/constants';
import * as actions from 'actions/async/actions';
import * as api from '../api/resume';

export function* updateResume() {
  while (true) {
    try {
      const resume: actions.UpdateResume = yield take(constants.UPDATE_RESUME);

      let isSuccessful = yield call(api.updateResume, resume.payload);
      if (isSuccessful) {
        console.log(isSuccessful);
      }
    } catch (e) {
      put(actionCreator.requestError(e.response.data));
      console.log(e);
    }
  }
}

export function* updateTemplate() {
  while (true) {
    try {
      const template: actions.UpdateTemplate = yield take(constants.UPDATE_TEMPLATE);

      let isSuccessful = yield call(api.updateTemplate, template.payload);
      if (isSuccessful) {
        console.log(isSuccessful);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default function* reusme() {
  yield fork(updateResume);
  yield fork(updateTemplate);
}