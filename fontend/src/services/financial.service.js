import api from "./api";
const VITE_FINANCIAL_API = import.meta.env.VITE_FINANCIAL_API;

const getAllFinancialRecordByUserId = async (userID) => {
    return await api.get(`${VITE_FINANCIAL_API}/user/${userID}`); // ใช้ userID แทน id
};

const getAllFinancial = async () => {
    return await api.get(`${VITE_FINANCIAL_API}`);
};

const getAllFinancialRecordById = async (id) => {
    return await api.get(`${VITE_FINANCIAL_API}/${id}`);
};

const createFinancialRecord = async (record) => {
    return await api.post(`${VITE_FINANCIAL_API}`, record);
};

const updateFinancialRecord = async (id, record) => {
    return await api.put(`${VITE_FINANCIAL_API}/${id}`, record);
};

const deleteFinancialRecord = async (id) => {
    try {
        const response = await api.delete(`${VITE_FINANCIAL_API}/${id}`);
        if (response.status === 200 || response.status === 204) {
            return response; // สถานะ 200 หรือ 204 หมายถึงการลบสำเร็จ
        } else {
            throw new Error(`Failed to delete record. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        throw error;
    }
};


const FinancialService = {
    getAllFinancialRecordByUserId,
    getAllFinancial,
    getAllFinancialRecordById,
    createFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord
};

export default FinancialService;
