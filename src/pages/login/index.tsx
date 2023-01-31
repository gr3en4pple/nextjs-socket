import Button from '@/components/common/Button';
import { HttpClient } from '@/config/http-client';
import Header from '@/layout/Header';
import React, { useRef } from 'react';

const Login = () => {
  const formRef = useRef(null);

  return (
    <>
      <Header pageTitle="Login" />
      <div className="w-full flex justify-center">
        <div className="mt-5">
          <p className="text-4xl">Login page</p>
          <form
            ref={formRef}
            onSubmit={async (e) => {
              e.preventDefault();
              if (formRef.current) {
                const formData = new FormData(formRef.current);
                const username = formData.get('username');
                const password = formData.get('password');
                if ((username && username?.length < 6) || (password && password?.length < 6)) return;
                try {
                  const res = await HttpClient.post('/auth/login', {
                    username,
                    password,
                  });
                  console.log('res:', res);
                  window.localStorage.setItem('accessToken', res.access_token);
                } catch (error) {
                  console.log('error:', error);
                }
              }
            }}
            className="mt-20"
          >
            <div>
              <label className="block" htmlFor="username">
                User name*
              </label>
              <input id="username" name="username" className="rounded-lg border outline-none p-2 px-4" />
            </div>
            <div>
              <label className="block" htmlFor="password">
                Pass word*
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
    </>
  );
};

export default Login;
