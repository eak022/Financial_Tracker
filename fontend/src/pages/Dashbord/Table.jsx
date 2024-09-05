import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทาง
import { useUser } from '@clerk/clerk-react';
import FinancialService from '../../services/financial.service'; // นำเข้า FinancialService

function Table() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate(); // ใช้สำหรับการนำทาง
  const { user } = useUser(); // ดึงข้อมูลของผู้ใช้ที่ล็อกอิน

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) { // ตรวจสอบว่าผู้ใช้ได้ล็อกอินแล้ว
          const response = await FinancialService.getAllFinancialRecordByUserId(user.id); // ใช้ FinancialService
          console.log("Data fetched: ", response); // ตรวจสอบโครงสร้างของข้อมูล

          // ตรวจสอบว่า response.data เป็นอาร์เรย์หรือไม่
          if (Array.isArray(response.data)) {
            setRecords(response.data);
          } else {
            console.error('Expected response.data to be an array but received:', response);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]); // เพิ่ม 'user' เป็น dependency
  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือ?',
        text: 'คุณจะไม่สามารถกู้คืนสิ่งนี้ได้!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบมัน!'
    });

    if (result.isConfirmed) {
        try {
            const response = await FinancialService.deleteFinancialRecord(id);
            if (response.status === 200 || response.status === 204) {
                Swal.fire('ลบแล้ว!', 'เรคคอร์ดของคุณถูกลบแล้ว.', 'success');
                setRecords(records.filter(record => record.id !== id));
            } else {
                throw new Error(`ไม่สามารถลบเรคคอร์ดได้. รหัสสถานะ: ${response.status}`);
            }
        } catch (error) {
            console.error('ข้อผิดพลาด:', error);
            Swal.fire('ล้มเหลว!', `ไม่สามารถลบเรคคอร์ดได้. ${error.message}`, 'error');
        }
    }
};


  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // นำทางไปยังหน้าการแก้ไข
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Category</td>
            <td>Date</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Payment Method</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id || index}> {/* ใช้ index ถ้าไม่มี id */}
              <th>{index + 1}</th>
              <td>{record.category}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.description}</td>
              <td>{record.amount}</td>
              <td>{record.paymentMethod}</td>
              <td>
                <button
                  onClick={() => handleEdit(record.id)}
                  className="btn btn-secondary btn-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <td>Category</td>
            <td>Date</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Payment Method</td>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
