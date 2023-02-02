import { formatHumanReadableDate } from '@/utils/date';
import React from 'react';

interface Props {
  isMe: boolean;
  chat: any;
}

const ChatContent: React.FC<Props> = ({ isMe, chat }) => {
  return (
    <div className="group">
      <div className={`flex w-full  p-2  items-center ${isMe ? 'justify-end' : ' '} relative`}>
        <div className={`${isMe ? 'bg-blue-500' : 'bg-slate-500'} peer p-2 rounded-lg text-white`}>
          <span className="font-bold mr-1">{chat.user}:</span>
          <span className="whitespace-pre-line">{chat.content}</span>
        </div>
        <p className="absolute bottom-[-8px] peer-hover:opacity-100 opacity-0  text-xs text-slate-500">
          {formatHumanReadableDate(chat.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ChatContent;
