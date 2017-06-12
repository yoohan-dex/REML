import {
  Logout,
  RequestError,
  SendingRequest,
  SignIn,
  SignUp,
  SignInSuccess,
} from '../actions/async/actions';
import * as types from 'actions/async/constants';

export interface AuthState {
  user: string;
  sending: boolean;
  error: string;
}

type Actions = SignIn
  | SignUp
  | SendingRequest
  | RequestError
  | Logout
  | SignInSuccess;

const authState: AuthState = {
  user: '',
  sending: false,
  error: '',
};

export default (state: AuthState = authState, action: Actions): AuthState => {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return ({
        ...state,
        user: action.user,
      });
    case types.SENDING_REQUEST:
      return ({
        ...state,
        sending: action.sending,
      });
    case types.REQUEST_ERROR:
      return ({
        ...state,
        error: action.message,
      });
    case types.SIGN_IN_SUCCESS:
      return ({
        ...state,
        user: action.user,
      });
    case types.LOGOUT:
      return ({
        ...state,
        user: '',
      });
    default:
      return state;
  }
};