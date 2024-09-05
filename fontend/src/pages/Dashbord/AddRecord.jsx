import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FinancialService from '../../services/financial.service';

const AddRecord = () => {
  const [financial, setFinancial] = useState({
    category: "",
    date: "",
    description: "",
    amount: "",
    paymentMethod: ""
  });

  const navigate = useNavigate(); // ใช้ useNavigate
  const { user } = useUser(); // ดึงข้อมูลผู้ใช้จาก Clerk

  useEffect(() => {
    // ไม่จำเป็นต้องทำอะไรเพิ่มใน useEffect เนื่องจาก user.id จะถูกใช้งานตอนส่งข้อมูล
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancial({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // เพิ่ม userID เข้าไปในข้อมูลที่ส่ง
    const record = { ...financial, userID: user.id };

    try {
      const response = await FinancialService.createFinancialRecord(record);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Record added successfully',
          icon: 'success'
        }).then(() => {
          navigate('/'); // เปลี่ยนหน้าไปที่โฮม
        });
      } else {
        throw new Error('Failed to add record');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add record',
        icon: 'error'
      });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category of Entry */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered"
            name="category"
            value={financial.category}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered"
            value={financial.date}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered"
            placeholder="Enter description"
            value={financial.description}
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            className="input input-bordered"
            placeholder="Enter amount"
            value={financial.amount}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Payment Method</span>
          </label>
          <select
            name="paymentMethod"
            className="select select-bordered"
            value={financial.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select a payment method</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecord;
