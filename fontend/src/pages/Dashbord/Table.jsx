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
          const data = await FinancialService.getAllFinancialRecordByUserId(user.id); // ใช้ FinancialService
          setRecords(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]); // เพิ่ม 'user' เป็น dependency

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await FinancialService.deleteFinancialRecord(id); // ใช้ FinancialService สำหรับลบข้อมูล
        if (response.ok) {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
          setRecords(records.filter(record => record.id !== id));
        } else {
          throw new Error('Failed to delete record');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Failed!', 'Failed to delete record.', 'error');
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
            <tr key={record.id || index}>
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
