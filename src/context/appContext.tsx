import { WSChat } from '@/services/socket';
import { getMe } from '@/services/user';
import { getCookie } from 'cookies-next';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const AppContext = createContext<{
  socket: Socket | undefined;
  user: User | null;
}>({ socket: undefined, user: null });

export const useAppContext = () => useContext(AppContext);

interface User {
  username: string;
  id: string;
}

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on(WSChat.RECEIVE, (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    let socketInstance: Socket | undefined;
    const connectSocket = async () => {
      try {
        const accessTokenCookie = getCookie('accessToken');

        const res = await getMe(accessTokenCookie);
        if (res.username) {
          setUser(res);
          socketInstance = io(process.env.SOCKET_URL ?? '', {
            extraHeaders: { Authorization: `Bearer ${accessTokenCookie}` },
          });

          socketInstance.on('connect', () => {
            setSocket(socketInstance);
          });
        }
      } catch (error) {}
    };
    connectSocket();
    return () => {
      socketInstance?.disconnect();
    };
  }, []);

  return <AppContext.Provider value={{ socket, user }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
