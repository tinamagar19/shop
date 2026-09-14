import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
});

const EXCHANGE_RATE = 135;

const transformProduct = (product) => ({
  ...product,
  price: Math.round(product.price * EXCHANGE_RATE)
});

export const getProducts = async (limit = 30, skip = 0) => {
  const response = await api.get(`/products`, {
    params: { limit, skip },
  });
  return {
    ...response.data,
    products: response.data.products.map(transformProduct)
  };
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return transformProduct(response.data);
};

export const getCategories = async () => {
  const response = await api.get(`/products/categories`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return {
    ...response.data,
    products: response.data.products.map(transformProduct)
  };
};

export const searchProducts = async (query) => {
  const response = await api.get(`/products/search`, {
    params: { q: query },
  });
  return {
    ...response.data,
    products: response.data.products.map(transformProduct)
  };
};
