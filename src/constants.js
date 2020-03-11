const localhost = 'http://127.0.0.1:8000';

const apiURL = '/api';

export const endpoint = `${localhost}${apiURL}`;

export const articleListURL = `${endpoint}`;
export const articleCreateURL = `${endpoint}/create/`;
export const articleUpdateURL = id => `${endpoint}/${id}/update/`;
export const articleDeleteURL = id => `${endpoint}/${id}/delete/`;
export const articleDetailURL = id => `${endpoint}/${id}/detail/`;