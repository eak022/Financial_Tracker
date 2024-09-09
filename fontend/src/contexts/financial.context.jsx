// financial.context.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import FinancialService from '../services/financial.service';
import { useUser } from '@clerk/clerk-react';

export const FinancialReccordContext = createContext();

export const FinancialReccordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();

  const fetchRecord = async (id) => {
    try {
      const response = await FinancialService.getAllFinancialRecordById(id); // ค้นหาข้อมูลตาม ID
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const fetchAllRecords = async () => {
    if (!user) return;
    try {
      const response = await FinancialService.getAllFinancialRecordByUserId(user.id);
      if (response.status === 200) {
        setRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRecord = async (record) => {
    try {
      const response = await FinancialService.createFinancialRecord(record);
      if (response.status === 200) {
        setRecords((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (id, newRecord) => {
    try {
      const response = await FinancialService.updateFinancialRecord(id, newRecord);
      if (response.status === 200) {
        setRecords((prev) =>
          prev.map((record) =>
            record.id === id ? { ...record, ...response.data } : record
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await FinancialService.deleteFinancialRecord(id);
      if (response.status === 200) {
        setRecords((prev) =>
          prev.filter((record) => record.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialReccordContext.Provider
    value={{ records, fetchRecord, addRecord, updateRecord, deleteRecord, fetchAllRecords }} // เพิ่ม fetchAllRecords ที่นี่
  >
    {children}
  </FinancialReccordContext.Provider>
  );
};

export const useFinancialRecord = () => useContext(FinancialReccordContext);
