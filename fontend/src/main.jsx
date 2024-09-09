// main.jsx หรือ index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ตรวจสอบว่ามีการ import CSS
import { RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { FinancialReccordsProvider } from './contexts/financial.context'; // นำเข้า FinancialReccordsProvider แบบ named import
import router from './routers/Router';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <FinancialReccordsProvider>
        <RouterProvider router={router} />
      </FinancialReccordsProvider>
    </ClerkProvider>
  </React.StrictMode>
);
