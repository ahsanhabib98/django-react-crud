const localhost = 'https://dj-crud.herokuapp.com';

const apiURL = '/api';
const authURL = '/rest-auth';

export const endpoint = `${localhost}${apiURL}`;
export const authEndpoint = `${localhost}${authURL}`;

export const articleListURL = `${endpoint}/`;
export const articleCreateURL = `${endpoint}/create/`;
export const articleUpdateURL = id => `${endpoint}/${id}/update/`;
export const articleDeleteURL = id => `${endpoint}/${id}/delete/`;
export const articleDetailURL = id => `${endpoint}/${id}/detail/`;
export const loginURL = `${authEndpoint}/login/`;
export const signupURL = `${authEndpoint}/registration/`;