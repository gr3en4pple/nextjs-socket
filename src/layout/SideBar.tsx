import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';

const arrays = ['Home', 'login', 'chat'];

const SideBar: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="border-r w-[250px]">
        <ul className="w-full mt-5 ">
          {arrays.map((menu, index) => (
            <li className="p-2 text-center border-b capitalize" key={menu}>
              <Link href={index === 0 ? '/' : menu}>{menu}</Link>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default SideBar;
