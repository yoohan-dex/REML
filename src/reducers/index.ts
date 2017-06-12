import auth, { AuthState } from './auth';
import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import resuming from './resuming';
import { routerReducer, RouterState } from 'react-router-redux';
// import codebase, { CodebaseState } from './codebase';
import resume from './resume';
import { ResumeStore } from 'modules/RenderMachine/typings';

export interface State {
  resumeStore: ResumeStore;
  resuming: ResumeStore;
  // codebase: CodebaseState;
  router: RouterState;
  global: GlobalState;
  auth: AuthState;
}

export default combineReducers<State>({
  global,
  resumeStore: resume,
  router: routerReducer,
  auth,
  resuming,
  // codebase: codebase,
});