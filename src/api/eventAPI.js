import axios from './axiosInstance';

export const fetchEvents = async () => {
  const res = await axios.get('/events');
  return res.data;
};
