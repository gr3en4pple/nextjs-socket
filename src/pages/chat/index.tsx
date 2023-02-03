import Button from '@/components/common/Button';
import ChatBox from '@/components/views/chat/ChatBox';
import LayoutChat from '@/components/views/chat/LayoutChat';
import UserList from '@/components/views/chat/UserList';
import { useAppContext } from '@/context/appContext';
import Layout from '@/layout';
import { WSChat } from '@/services/socket';
import { formatHumanReadableDate } from '@/utils/date';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';

const Chat = () => {
  return <ChatBox chats={[]} />;
};

export default Chat;

Chat.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <LayoutChat>{page}</LayoutChat>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSideProps) {
  console.log('context:', context);
  return {
    props: {},
  };
}
