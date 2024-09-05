import React from 'react';
import { useUser } from '@clerk/clerk-react';
import Table from './Table';

const Dashbord = () => {
  const { user } = useUser();

  // Example totalMonthly value, replace with actual logic if available
  const totalMonthly = 0;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-base-100 p-4 rounded-lg shadow-md">
        <h1 className="btn btn-ghost text-xl">
          Welcome, {user?.firstName}!
        </h1>
        <p className="btn btn-ghost text-xl">
          Here are your financial records:
        </p>
        <div className="mt-4">
          <h2 className="btn btn-ghost text-xl">
            Total Monthly:
            <span className="text-secondary ml-2">{totalMonthly}฿</span>
          </h2>
        </div>
      </div>
      <br /><br />
      <div className="mt-6">
        <h3 className="btn btn-ghost text-xl">Financial Record Table</h3>
        <Table />
      </div>
    </div>
  );
};

export default Dashbord;
