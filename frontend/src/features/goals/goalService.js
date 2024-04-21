import axios from "axios";

const API_URL = "/api/goals";

const addGoals = async (data,token) => {
  let response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const displayGoals = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteGoals = async (id,token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const goalService = {
  addGoals,
  displayGoals,
  deleteGoals,
};

export default goalService;
