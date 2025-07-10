import axios from "axios";

const API = "https://workoai-backend.onrender.com/candidate";

// Reusable auth header
const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET all candidates
export const fetchCandidatesAPI = async () => {
  const res = await axios.get(`${API}/get-all`, getAuthHeader());
  return res.data;
};

// POST new candidate
export const addCandidateAPI = async (candidateData) => {
  const res = await axios.post(API, candidateData, getAuthHeader());
  return res.data;
};

// PUT update status
export const updateCandidateStatusAPI = async ({ id, status }) => {
  const res = await axios.patch(`${API}/update/${id}`, { status }, getAuthHeader());
  return res.data;
};

// DELETE candidate
export const deleteCandidateAPI = async (id) => {
  await axios.delete(`${API}/delete/${id}`, getAuthHeader());
  return id;
};
