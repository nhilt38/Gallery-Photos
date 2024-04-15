import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const register = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/register`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  let { access_token } = response.data;
  localStorage.setItem("auth_token", access_token);
  return access_token;
};

export const getProfile = async () => {
  var authToken = localStorage.getItem("auth_token");
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export const getProfileWithToken = async (authToken) => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export const fetchPictures = async (page, take) => {
  const response = await axios.get(`${BASE_URL}/photos`, {
    params: {
      page,
      take,
    },
  });
  return response.data;
};

export const fetchPicture = async (id) => {
  const response = await axios.get(`${BASE_URL}/photos/${id}`);
  return response.data;
};

export const uploadPicture = async (file, authToken) => {
  const formData = new FormData();
  formData.append("photo", file);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axios.post(`${BASE_URL}/photos/upload`, formData, {
    headers,
  });
  return response.data;
};

export const uploadPictures = async (files, authToken) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("photos[]", file));
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axios.post(`${BASE_URL}/photos/uploads`, formData, {
    headers,
  });
  return response.data;
};

export const fetchComments = async (photoId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.get(`${BASE_URL}/comments/${photoId}`, {
    headers,
  });
  return response.data;
};

export const writeComment = async (photoId, text, authToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  const data = {
    photoId,
    text,
  };
  const response = await axios.post(`${BASE_URL}/comments`, data, {
    headers,
  });
  return response.data;
};
