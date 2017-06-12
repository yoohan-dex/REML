require('isomorphic-fetch');

function parseJSON(response: Response) {
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  // tslint:disable-next-line:no-string-literal
  error['response'] = response;
  throw error;
}

export default function request(url: string, options?: {
  method: 'GET' | 'POST',
  body?: object,
}) {
  return fetch(url, Object.assign(
    {}, {
      headers: { 'Content-Type': 'application/json' },
      ...options, crossDomain: true, json: true, body: options && options.body
    })
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}