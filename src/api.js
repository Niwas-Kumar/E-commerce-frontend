import axios from "axios";

// Replace this with your deployed backend URL
const API = axios.create({
  baseURL: "https://e-commerce-backend-16mq.onrender.com/api",
});

export default API;
