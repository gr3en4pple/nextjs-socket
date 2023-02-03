import Button from '@/components/common/Button';
import { useAppContext } from '@/context/appContext';
import { useString } from '@/hooks/useDefault';
import { WSChat } from '@/services/socket';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import ChatContent from './ChatContent';

interface ChatProps {
  chats: any[];
  loading?: boolean;
}
const ChatBox: React.FC<ChatProps> = ({ chats, loading }) => {
  const boxChatRef = useRef<any>(null);

  useEffect(() => {
    if (chats.length && boxChatRef.current) {
      boxChatRef.current?.scrollTo(0, boxChatRef.current.scrollHeight);
    }
  }, [chats, boxChatRef]);

  const input = useString();
  const router = useRouter();
  const { user, socket } = useAppContext();
  const { room } = router.query;
  const onSubmitChat = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.value.trim() || !input.value) return;
    socket?.emit(WSChat.SEND, { content: input.value, otherId: room });
    input.setValue('');
  };
  return (
    <div className="">
      <div
        ref={boxChatRef}
        className="border relative flex flex-col h-[500px] overflow-y-auto w-full rounded-lg p-2 mb-10"
      >
        {loading ? (
          <div className="absolute z-10 bg-[rgba(0,0,0,.1)] inset-0 flex h-full justify-center items-center">
            Loading...
          </div>
        ) : (
          chats.map((chat) => {
            const isMe = user?.username === chat.user;
            return <ChatContent key={chat._id} isMe={isMe} chat={chat} />;
          })
        )}
      </div>
      <form onSubmit={onSubmitChat}>
        <textarea
          disabled={router.pathname === '/chat'}
          placeholder="Type something..."
          value={input.value}
          onChange={(e) => {
            input.setValue(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) onSubmitChat();
          }}
          name="chatInput"
          className="border w-full h-[100px] rounded-lg p-2 outline-none resize-none"
        />
        <Button disabled={router.pathname === '/chat'}>Send</Button>
      </form>
    </div>
  );
};

export default ChatBox;
