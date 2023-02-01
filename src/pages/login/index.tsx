import Button from '@/components/common/Button';
import { HttpClient } from '@/config/http-client';
import { useAppContext } from '@/context/appContext';
import { inter } from '@/layout';
import Header from '@/layout/Header';
import { setCookies } from 'cookies-next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { NextPageWithLayout } from 'src/pages/_app';

const Login: NextPageWithLayout = () => {
  const formRef = useRef(null);
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const username = formData.get('username');
      const password = formData.get('password');
      if ((username && username?.toString().length < 6) || (password && password.toString().length < 6)) {
        alert('user name or password too short');
        return;
      }

      try {
        const res = await HttpClient.post('/auth/login', {
          username,
          password,
        });
        window.localStorage.setItem('accessToken', res.access_token);
        setCookies('accessToken', res.access_token);
        router.push('/');
      } catch (error) {
        console.log('error:', error);
      }
    }
  };

  return (
    <main className={inter.className}>
      <Header pageTitle="Login" />
      <div className="w-full flex justify-center">
        <div className="mt-5">
          <p className="text-4xl">Login page</p>
          <form ref={formRef} onSubmit={onLogin} className="mt-20">
            <div>
              <label className="block" htmlFor="username">
                User name<span className="text-red-500 font-bold">*</span>
              </label>
              <input id="username" name="username" className="rounded-lg border outline-none p-2 px-4" />
            </div>
            <div>
              <label className="block" htmlFor="password">
                Password<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-lg border outline-none p-2 px-4"
              />
            </div>
            <Button>Sign in</Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
