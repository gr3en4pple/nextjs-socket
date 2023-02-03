import ChatBox from '@/components/views/chat/ChatBox';
import LayoutChat from '@/components/views/chat/LayoutChat';
import { useAppContext } from '@/context/appContext';
import { useBoolean } from '@/hooks/useDefault';
import Layout from '@/layout';
import { WSChat } from '@/services/socket';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

const ChatRoom = () => {
  const { socket } = useAppContext();
  const [chats, setChats] = useState([]);
  const fetchingChat = useBoolean(true);

  useEffect(() => {
    fetchingChat.setValue(true);
    socket?.on(WSChat.ALL_CHAT, (chats) => {
      setChats(chats);
      fetchingChat.setValue(false);
    });
  }, [socket]);
  return <ChatBox loading={fetchingChat.value} chats={chats} />;
};

export default ChatRoom;

ChatRoom.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <LayoutChat>{page}</LayoutChat>
    </Layout>
  );
};
