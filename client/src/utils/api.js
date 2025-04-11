const BASE_URL = 'http://localhost:8080';

// Helper function to handle responses
const handleResponse = async (response) => {
  console.log('handleResponse - Raw Response:', response);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  return response.json();
};

// Authentication
export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// Reference Ranges
export const fetchReferenceRanges = async (token) => {
  const response = await fetch(`${BASE_URL}/reference_ranges`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

export const createReferenceRange = async (token, rangeData) => {
  const response = await fetch(`${BASE_URL}/reference_ranges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(rangeData),
  });
  return handleResponse(response);
};

export const updateReferenceRange = async (token, id, rangeData) => {
  const response = await fetch(`${BASE_URL}/reference_ranges/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(rangeData),
  });
  return handleResponse(response);
};

export const deleteReferenceRange = async (token, id) => {
  const response = await fetch(`${BASE_URL}/reference_ranges/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

// Studies
export const fetchStudies = async (token) => {
  const response = await fetch(`${BASE_URL}/studies`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

export const createStudy = async (token, studyData) => {
  const response = await fetch(`${BASE_URL}/studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(studyData),
  });
  return handleResponse(response);
};

export const updateStudy = async (token, id, studyData) => {
  const response = await fetch(`${BASE_URL}/studies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(studyData),
  });
  return handleResponse(response);
};

export const deleteStudy = async (token, id) => {
  const response = await fetch(`${BASE_URL}/studies/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

// Departments
export const fetchDepartments = async (token) => {
  const response = await fetch(`${BASE_URL}/departments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};

export const createDepartment = async (token, data) => {
  const response = await fetch(`${BASE_URL}/departments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteDepartment = async (token, deptId) => {
  const response = await fetch(`${BASE_URL}/departments/${deptId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
};
