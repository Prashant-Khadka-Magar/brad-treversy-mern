import axios from "axios";

const API_URL = "/api/goals";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YThhNjYyODEzNjc3MDE2YjA2OWZiMSIsImlhdCI6MTcwNTY0ODczNywiZXhwIjoxNzA4MjQwNzM3fQ.m67i7nVPqGPeDtCVYRBfYBpfnlbiddubodIS91nDWr8";

const addGoals = async (data) => {
  let response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const displayGoals = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteGoals = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data)
  return response.data;
};

const goalService = {
  addGoals,
  displayGoals,
  deleteGoals,
};

export default goalService;
