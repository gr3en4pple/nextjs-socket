import { HttpClient } from '@/config/http-client';

import { USER_API } from '@/services';

export const getMe = async (accessToken?: any) => {
  const res = await HttpClient.get(USER_API.ME, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('res:', res);
  return res;
};
