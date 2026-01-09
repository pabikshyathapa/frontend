import api from "../api/api";

export const addPeriodAPI = async (data) => {
  const res = await api.post("/period/add", data);
  // sync to localStorage
  const saved = res.data.data;
  const history = JSON.parse(localStorage.getItem("periodHistory")) || [];
  history.unshift(saved);
  localStorage.setItem("periodHistory", JSON.stringify(history));
  return saved;
};

export const getHistoryAPI = async () => {
  const res = await api.get("/period/history");
  localStorage.setItem("periodHistory", JSON.stringify(res.data.data));
  return res.data.data;
};

export const getStatusAPI = async () => {
  const res = await api.get("/period/status");
  localStorage.setItem("cycleStatus", JSON.stringify(res.data));
  return res.data;
};

export const checkIrregularAPI = async () => {
  const res = await api.get("/period/irregular");
  localStorage.setItem("cycleIrregularity", JSON.stringify(res.data));
  return res.data;
};

export const predictAPI = async () => {
  const res = await api.get("/period/predict");
  localStorage.setItem("cyclePrediction", JSON.stringify(res.data.data || {}));
  return res.data;
};
