import axios from "axios";

const api = axios.create({
  baseURL:
    "https://dummyjson.com",
});

export const getProducts = async (limit,skip) => {
  const res = await api.get(  `/products?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const getCategories =async () => {
    const res =await api.get("/products/categories");
    return res.data;
};

export const getProductsByCategory =async (category,limit,skip) => {
    const res =await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
    return res.data;
};

export const getSingleProduct =async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
};