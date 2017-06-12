import axios from 'axios';
import { SignUpPayload, SignInPayload } from 'actions/async/actions';

export function logout() {
  return localStorage.removeItem('access_token');
}

export function setAuth(tokens: string) {
  return localStorage.setItem('access_token', tokens);
}

export function signUp(payload: SignUpPayload) {
  return axios.post('/api/users/signup', payload);
}

export function signIn(payload: SignInPayload) {
  return axios.post('/api/users/signin', payload);
}
