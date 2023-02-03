import Link from 'next/link';
import React from 'react';

interface Props {
  listUser: any[];
  user: any;
  room?: string | string[];
}
const UserList: React.FC<Props> = ({ listUser, user, room }) => {
  return (
    <div className="w-full overflow-hidden">
      <p className="text-2xl font-bold text-center">Users</p>
      {listUser.map((otherUser) => (
        <Link key={otherUser.id} className="mb-1 block" href={`/chat/${otherUser.id}`}>
          <div
            className={`text-xl items-center md:justify-start justify-center flex ${
              room === otherUser.id ? 'bg-[rgba(0,0,0,.1)]' : 'hover:bg-[rgba(0,0,0,.1)] '
            }  transition rounded-lg py-2 px-2`}
          >
            <div className="w-12 h-12 md:w-6 md:h-6 flex justify-center items-center uppercase text-slate-500 font-bold  rounded-full border border-slate-400">
              {otherUser?.username?.slice(0, 1)}
            </div>

            <p className={`pl-2 hidden md:block ${otherUser.status === 'offline' ? 'opacity-50' : ' '} `}>
              {otherUser.username === user.username ? 'You' : otherUser.username}
            </p>

            <div
              className={`${otherUser.status === 'online' ? 'bg-green-400' : 'bg-gray-300'} w-2 h-2 rounded-full ml-2`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
