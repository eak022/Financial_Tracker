// src/component/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import SidebarMenu from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navbar />
      </header>
      <div className="flex flex-1">
        <SidebarMenu />
        <main className="flex-1 p-4">
          <Outlet /> {/* This renders the matched child route */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
