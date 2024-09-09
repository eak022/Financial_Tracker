import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useFinancialRecord } from '../../contexts/financial.context';

function Table() {
  const { records, fetchAllRecords, deleteRecord } = useFinancialRecord();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchAllRecords();
    }
  }, [user, fetchAllRecords]);

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
        await deleteRecord(id);
        Swal.fire('ลบแล้ว!', 'เรคคอร์ดของคุณถูกลบแล้ว.', 'success');
      } catch (error) {
        console.error('ข้อผิดพลาด:', error);
        Swal.fire('ล้มเหลว!', `ไม่สามารถลบเรคคอร์ดได้. ${error.message}`, 'error');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id}>
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
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
