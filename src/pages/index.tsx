import Hello from '@/components/Hello';
import Header from '@/layout/Header';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    socket?.emit('findAllGateway', (data: any) => {
      console.log('emit', data);
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001');

    socketInstance.on('connect', () => {
      console.log(socketInstance.connected);
      setSocket(socketInstance);
    });

    return () => {
      socketInstance?.disconnect();
    };
  }, []);
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
