import axios from "axios";

// Replace this with your deployed backend URL
const API = axios.create({
  baseURL: "https://e-commerce-frontend-bice-phi.vercel.app/api",
});

export default API;
