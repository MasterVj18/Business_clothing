import axios from "axios";

const API_URL = "http://localhost:8080/api/api/suppliers";  // Removed duplicate /api/

export const getAllSuppliers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addSupplier = async (supplier) => {
    const response = await axios.post(API_URL, supplier);
    return response.data;
};

export const updateSupplier = async (id, supplier) => {
    const response = await axios.put(`${API_URL}/${id}`, supplier);
    return response.data;
};

export const deleteSupplier = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
}; 