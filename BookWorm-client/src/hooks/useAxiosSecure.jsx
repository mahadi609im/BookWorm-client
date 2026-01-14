import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://book-worm-server-psi.vercel.app',
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
