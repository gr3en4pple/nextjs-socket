import axios, { AxiosRequestConfig } from 'axios';
const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class HttpClient {
  static async get(uri: string, config?: AxiosRequestConfig<any>) {
    const res = await AxiosInstance.get(uri, config);
    return res.data;
  }

  static async post(uri: string, data?: any, config?: AxiosRequestConfig<any>) {
    const res = await AxiosInstance.post(uri, data, config);
    return res.data;
  }
}
