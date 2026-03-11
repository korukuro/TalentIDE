import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL, //base url for all the api calls
    withCredentials: true, //by adding this field browser will send the cookies to server automatically on every single request
});

export default axiosInstance;