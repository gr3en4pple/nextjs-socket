import { useAppContext } from '@/context/appContext';
import Layout from '@/layout';
import Header from '@/layout/Header';
import React from 'react';

export default function Home() {
  const { socket } = useAppContext();
  return (
    <>
      <Header />
      <div className="flex justify-center items-center  w-full">
        <div className="text-center">
          <div className="font-medium text-4xl">Hello!</div>
          <div className="text-sm ">You are connected to socket id: {socket?.id}</div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
