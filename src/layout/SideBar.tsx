import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

const arrays = ['Home', 'chat'];

const SideBar: React.FC<PropsWithChildren> = ({ children }) => {
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
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SideBar;
