const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchApi = async (endpoint, options = {}) => {
  const { headers, auth, ...customOptions } = options;
  const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth-storage'))?.state?.token : null;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: defaultHeaders,
      ...customOptions,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
