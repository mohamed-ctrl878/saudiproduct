import api from './api';

export const getCategories = async () => {
  try {
    const response = await api.get('/cats?populate=*');
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
