import api from './api';

export const createSchedule = async (data) => {
  try {
    const response = await api.post('/schedules', { data });
    return response.data;
  } catch (error) {
    console.error("Error submitting schedule:", error);
    throw error;
  }
};
