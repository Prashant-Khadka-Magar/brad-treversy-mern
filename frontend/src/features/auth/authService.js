import axios from "axios";

const API_URL = "/api/users/";

//Register User
const register = async (userData) => {
  //in the register post url it will upload the userData for registration
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// const getUser=async()=>{
//   const response= await axios.get(`${API_URL}/me`)

//   return response.data
// }

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
