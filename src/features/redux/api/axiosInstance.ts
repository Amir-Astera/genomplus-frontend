// src/AxiosInstans.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Ключевое: чтобы Set-Cookie и Cookie работали при CORS
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;



//Для авторизации по логину и паролю
//await fetch("http://localhost:8080/auth", {
//   method: "POST",
//   credentials: "include", // чтобы принять Set-Cookie
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email: "test@test.com", password: "123456" })
// });