import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FinancialService from '../services/financial.service';

const EditRecord = () => {
  const { id } = useParams();
  const [financial, setFinancial] = useState({
    category: "",
    date: "",
    description: "",
    amount: "",
    paymentMethod: ""
  });
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await FinancialService.getAllFinancialRecordById(id); // Corrected API call
        if (response.status === 200) {
          setFinancial(response.data); // Set the fetched data to the state
        } else {
          throw new Error('Failed to fetch record');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Failed to fetch record', 'error');
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancial({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!financial.category || !financial.date || !financial.description || !financial.amount || !financial.paymentMethod) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill out all fields',
        icon: 'error'
      });
      return;
    }

    // Prepare the updated record
    const updatedRecord = { ...financial, userID: user.id };

    try {
      const response = await FinancialService.updateFinancialRecord(id, updatedRecord);
      if (response.status === 200) {
        Swal.fire('Updated!', 'Your record has been updated.', 'success');
        navigate('/');
      } else {
        throw new Error('Failed to update record');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Failed!', 'Failed to update record.', 'error');
    }
  };

  if (!financial) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered"
            name="category"
            value={financial.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Financial Category</option>
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
            required
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
            required
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
            required
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
            required
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecord;
