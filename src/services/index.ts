import { getCookie } from 'cookies-next';
export const accessTokenGetter = () => getCookie('accessToken') ?? window.localStorage.getItem('accessToken') ?? '';

export const USER_API = {
  ME: '/user/me',
};

export const AUTH_API = {
  LOGIN: '/auth/login',
};
