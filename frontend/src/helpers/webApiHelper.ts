import _axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

const axios = _axios.create({
  baseURL: `${api_url}/`,
  timeout: 2000,
  withCredentials: true,
});

export default axios;
