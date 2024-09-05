import { createContext, useContext, useEffect, useState } from "react";
import FinancialService from "../services/financial.service";
import { useUser } from "@clerk/clerk-react";

export const FinancialReccordContext = createContext();

export const FinancialReccordsProvider = ({ children }) => {
    const [records, setRecords] = useState([])
    const { user } = useUser();
    const fetchRecord = async () => {
        if (!user) return;
        try {
            const response = await FinancialService.getAllFinancialRecordByUserId(user.id)
            if (response.status === 200) {
                setRecords(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchRecord();
    }, [user]);

    const addRecord = async (record) => {
        try {
            const response = await FinancialService.addRecord(record);
            if (response.status === 200) {
                setRecords((prev) => [...prev, response.data]);
            }

        } catch (error) {
            console.log(error);

        }
    }

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
                    prev.filter((record) =>
                        record.id !== id
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <FinancialReccordContext.Provider
        value={{ setRecords, addRecord, updateRecord, deleteRecord}}
    >

        {children}
    </FinancialReccordContext.Provider> );

};

export const useFinancialRecord = () => useContext(FinancialReccordContext);