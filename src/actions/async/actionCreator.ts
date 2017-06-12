import { ResumePayload, SignInPayload, SignUpPayload, TemplatePayload } from './actions';
import * as Actions from './actions';
import * as types from './constants';

export const sendingRequest = (sending: boolean): Actions.SendingRequest => ({
  type: types.SENDING_REQUEST,
  sending,
});

export const requestError = (message: string): Actions.RequestError => ({
  type: types.REQUEST_ERROR,
  message,
});

export const logout = (): Actions.Logout => ({
  type: types.LOGOUT,
});

export const signUp = (payload: SignUpPayload): Actions.SignUp => ({
  type: types.SIGN_UP,
  payload,
});

export const signIn = (payload: SignInPayload): Actions.SignIn => ({
  type: types.SIGN_IN,
  payload,
});

export const signInSuccess = (user: string): Actions.SignInSuccess => ({
  type: types.SIGN_IN_SUCCESS,
  user,
});

export const updateResume = (payload: ResumePayload): Actions.UpdateResume => ({
  type: types.UPDATE_RESUME,
  payload,
});

export const updateTempate = (payload: TemplatePayload): Actions.UpdateTemplate => ({
  type: types.UPDATE_TEMPLATE,
  payload,
});

export const getAllTemplate = (): Actions.GetAllTemplate => ({
  type: types.GET_ALL_TEMPLATE,
});
