import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecord = () => {
  const { id } = useParams(); // รับ ID จาก URL
  const [financial, setFinancial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/financial/${id}`);
        const data = await response.json();
        setFinancial(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    try {
      const response = await fetch(`http://localhost:5000/api/v1/financial/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(financial)
      });

      if (response.ok) {
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
        {/* User ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">User ID</span>
          </label>
          <input
            type="text"
            name="userID"
            className="input input-bordered"
            value={financial.userID}
            onChange={handleChange}
            disabled
          />
        </div>

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
