import { TemplatePayload, ResumePayload } from '../actions/async/actions';
import axios from 'axios';

const post = (url: string, data: any) => axios.post(url, data, {
  headers: {
    'authorization': localStorage.getItem('access_token'),
  }
});

const get = (url: string) => axios.get(url, {
  headers: {
    'authorization': localStorage.getItem('access_token'),
  }
});

export function updateResume(payload: ResumePayload) {
  return post('/api/resume/update', payload);
}

export function updateTemplate(payload: TemplatePayload) {
  return post('/api/template/update', payload);
}

export function getAllTemplate() {
  return get('/api/templates');
}

export function getMyTemplate() {
  return get('/api/templates/me');
}
