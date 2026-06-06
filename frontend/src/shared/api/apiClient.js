import { ApiError } from './apiError.js';
import { getToken } from '../../features/auth/utils/storage.js';

async function parseResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  const bodyIsForm = options.body instanceof FormData;

  if (!bodyIsForm && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, { ...options, headers });
  const data = await parseResponse(response);

  if (!response.ok) {
    const message = data?.mensaje || data?.message || `Error HTTP ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const apiClient = {
  get(path) {
    return request(path);
  },

  post(path, body = {}) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  delete(path) {
    return request(path, {
      method: 'DELETE'
    });
  },

  postForm(path, formData) {
    return request(path, {
      method: 'POST',
      body: formData
    });
  }
};
