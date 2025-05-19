import axios from "axios";

const API_URL = "http://localhost:8080/api/api/sales";

export const getAllSales = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSaleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createSale = async (saleData) => {
  const response = await axios.post(API_URL, saleData);
  return response.data;
};

export const updateSale = async (id, sale) => {
  const response = await axios.put(`${API_URL}/${id}`, sale);
  return response.data;
};

export const deleteSale = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
