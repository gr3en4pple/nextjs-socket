import { useAppContext } from '@/context/appContext';
import { WSChat } from '@/services/socket';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import UserList from './UserList';

const LayoutChat: React.FC<PropsWithChildren> = ({ children }) => {
  const [listUser, setListUser] = useState<any[]>([]);
  const { socket, user } = useAppContext();
  const router = useRouter();
  const { room } = router.query;

  useEffect(() => {
    if (socket?.connected) {
      socket?.on(WSChat.ALL_USERS, (users) => {
        setListUser(users);
      });

      socket?.emit(WSChat.JOIN_CHAT);
      if (room) {
        socket.emit(WSChat.JOIN_ROOM, room);
      }
    }

    return () => {
      socket?.emit(WSChat.LEAVE_ROOM, room);
    };
  }, [socket, room]);
  return (
    <div className="min-h-screen flex w-full mt-20">
      <div className="w-full">
        <p className="text-4xl font-bold text-center mb-5">Chat Box</p>
        <div className="flex gap-2">
          <div className="w-1/4 ">
            <UserList room={room} listUser={listUser} user={user} />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutChat;

export async function getServerSideProps(context: GetServerSideProps) {
  console.log('context:', context);
  return {
    props: {},
  };
}
