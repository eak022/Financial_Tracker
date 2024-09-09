import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../component/Layout'; // นำเข้าคอมโพเนนต์ Layout
import Home from '../pages/Home';
import Dashbord from '../pages/dashbord'
import AddRecord from '../pages/dashbord/AddRecord';
import EditRecord from '../pages/EditRecord';
import { FinancialReccordsProvider } from '../contexts/financial.context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ใช้ Layout เป็น element หลัก
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'dashbord',
        element: (
          <FinancialReccordsProvider>
            <Dashbord />
          </FinancialReccordsProvider>
        ),
      },
      {
        path: 'AddRecord',
        element: <AddRecord />,
      },
      {
        path: 'edit/:id', // แก้ไขเส้นทางให้ถูกต้อง
        element: <EditRecord />,
      },
      // เพิ่มเส้นทางอื่น ๆ ตามต้องการ
    ],
  },
]);

export default router;
