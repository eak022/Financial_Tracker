import api from "./api"
const VITE_FINANCIAL_API = import.meta.env.VITE_FINANCIAL_API;

const getAllFinancialRecordByUserId = async (userID) =>{
    return await api.get(`${VITE_FINANCIAL_API}/user/${id}`);
};
const getAllFinancial = async () =>{
    return await api.get(`${VITE_FINANCIAL_API}`);
};
const getAllFinancialRecordById = async (id) =>{
    return await api.get(`${VITE_FINANCIAL_API}/${id}`);
};

const createFinancialRecord = async (record) =>{
    return await api.post(`${VITE_FINANCIAL_API}`,record);
};

const updateFinancialRecord = async (id,record) =>{
    return await api.put(`${VITE_FINANCIAL_API}/${id}`,record);
};

const deleteFinancialRecord = async (id,) =>{
    return await api.delete(`${VITE_FINANCIAL_API}/${id}`);
};
const FinancialService = {
    getAllFinancialRecordByUserId,
    getAllFinancial,
    getAllFinancialRecordById,
    createFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord

  };

export default FinancialService