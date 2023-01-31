import { Inter } from '@next/font/google';
import React, { PropsWithChildren } from 'react';
import SideBar from './SideBar';

const inter = Inter({ subsets: ['latin'] });
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={inter.className}>
      <SideBar>{children}</SideBar>
    </main>
  );
};

export default Layout;
