import axios from "axios";
import authHeader from "./auth.headers";
const API_URL = "http://localhost:8080/api/content/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
};

export default UserService;
