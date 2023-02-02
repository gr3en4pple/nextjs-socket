import Button from '@/components/common/Button';
import { useAppContext } from '@/context/appContext';
import { useString } from '@/hooks/useDefault';
import { WSChat } from '@/services/socket';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import ChatContent from './ChatContent';

interface ChatProps {
  chats: any[];
}
const ChatBox: React.FC<ChatProps> = ({ chats }) => {
  const boxChatRef = useRef(null);
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
      <div ref={boxChatRef} className="border flex flex-col h-[500px] overflow-y-auto w-full rounded-lg p-2 mb-10">
        {chats.map((chat) => {
          const isMe = user?.username === chat.user;
          return <ChatContent key={chat.id} isMe={isMe} chat={chat} />;
        })}
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
