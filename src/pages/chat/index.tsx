import Button from '@/components/common/Button';
import { useAppContext } from '@/context/appContext';
import Layout from '@/layout';
import { WSChat } from '@/services/socket';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

const Chat = () => {
  const boxChatRef = useRef<HTMLDivElement>(null);
  const { socket, user } = useAppContext();
  const [input, setInput] = useState('');

  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    if (socket?.connected) {
      socket?.on(WSChat.ALL_CHAT, (chats) => {
        setChats(chats);
        if (boxChatRef.current) {
          boxChatRef.current.scrollIntoView();
        }
      });
      socket?.on(WSChat.CONNECTED_CHAT, (chats) => {
        setChats(chats);
      });
    }
  }, [socket, boxChatRef]);

  return (
    <div className="min-h-screen flex justify-center mt-20">
      <div>
        <p className="text-2xl font-bold">Chat Box</p>
        <div className="border w-[500px] h-[400px] overflow-y-scroll rounded-lg p-2 mb-10">
          {chats.map((chat) => {
            const isMe = user?.username === chat.user;
            return (
              <div key={chat._id} className={` flex w-full p-2 items-center ${isMe ? 'justify-end' : ' '} `}>
                <div className={`${isMe ? 'bg-blue-500' : 'bg-slate-500'} p-2 rounded-lg text-white`}>
                  <span className="font-bold mr-1">{chat.user}:</span>
                  <span>{chat.content}</span>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || !input) return;
            socket?.emit(WSChat.SEND, input);
            setInput('');
          }}
        >
          <textarea
            value={input}
            onChange={(e) => {
              const { value } = e.target;
              setInput(value);
            }}
            name="chatInput"
            className="border w-[500px] h-[100px] rounded-lg p-2 outline-none resize-none"
          />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

Chat.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
