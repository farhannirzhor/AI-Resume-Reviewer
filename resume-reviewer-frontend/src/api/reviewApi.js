import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * Submit resume for AI analysis.
 * @param {string} jobRole
 * @param {string} jobDescription
 * @param {File} resumeFile
 */
export async function analyzeResume(jobRole, jobDescription, resumeFile) {
  const formData = new FormData();
  formData.append('job_role', jobRole);
  formData.append('job_description', jobDescription);
  formData.append('resume', resumeFile);

  const response = await api.post('/api/review/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

/**
 * Fetch review history list.
 */
export async function getHistory() {
  const response = await api.get('/api/review/history');
  return response.data;
}

/**
 * Fetch a single review by ID.
 * @param {number} id
 */
export async function getReviewById(id) {
  const response = await api.get(`/api/review/${id}`);
  return response.data;
}
