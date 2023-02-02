import ChatBox from '@/components/views/chat/ChatBox';
import LayoutChat from '@/components/views/chat/LayoutChat';
import { useAppContext } from '@/context/appContext';
import Layout from '@/layout';
import { WSChat } from '@/services/socket';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

const ChatRoom = () => {
  const { socket } = useAppContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket?.on(WSChat.ALL_CHAT, (chats) => {
      setChats(chats);
    });
  }, [socket]);
  return <ChatBox chats={chats} />;
};

export default ChatRoom;

ChatRoom.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <LayoutChat>{page}</LayoutChat>
    </Layout>
  );
};
