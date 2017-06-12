import { Action } from 'redux';
import * as types from './constants';
import { ResumeStore } from 'modules/RenderMachine/typings';
export interface NAction extends Action {
  payload: any;
}

export interface SendingRequest extends Action {
  type: types.SENDING_REQUEST;
  sending: boolean;
}

export interface RequestError extends Action {
  type: types.REQUEST_ERROR;
  message: string;
}

export interface Logout extends Action {
  type: types.LOGOUT;
}

export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignIn extends NAction {
  type: types.SIGN_IN;
  payload: SignInPayload;
}

export interface SignUpPayload {
  email: string;
  username: string;
  password: string;
  retypePassword: string;
}

export interface SignUp extends NAction {
  type: types.SIGN_UP;
  payload: SignUpPayload;
}

export interface SignInSuccess extends Action {
  type: types.SIGN_IN_SUCCESS;
  user: string;
}

export interface SetAuth extends Action {
  type: types.SET_AUTH;
  tokens: string;
}

export interface ResumePayload {
  resume: ResumeStore;
  data: any;
}

export interface UpdateResume extends NAction {
  type: types.UPDATE_RESUME;
  payload: ResumePayload;
}

export interface TemplatePayload {
  template: ResumeStore;
  name: string;
}

export interface UpdateTemplate extends NAction {
  type: types.UPDATE_TEMPLATE;
  payload: TemplatePayload;
}

export interface GetAllTemplate extends Action {
  type: types.GET_ALL_TEMPLATE;
}
