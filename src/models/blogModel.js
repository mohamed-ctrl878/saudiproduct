import api from './api';

export const getBlogs = async () => {
  try {
    const response = await api.get('/blogs?populate=*');
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogByDocumentId = async (documentId) => {
  try {
    const response = await api.get(`/blogs/${documentId}?populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    throw error;
  }
};


