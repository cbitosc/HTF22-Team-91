import axios from 'axios'

const API_URL = 'http://localhost:9000/api/submissions/'

// Create new goal
const addSubmission = async (SubmissionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }

  const response = await axios.post(API_URL, SubmissionData, config)

  return response.data
}

// Get all Submissiones
const getSubmissions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Update Submission
const updateSubmission = async (SubmissionId, SubmissionData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  
    const response = await axios.put(API_URL + SubmissionId, SubmissionData, config)
  
    return response.data
  }

// Delete Submission
const deleteSubmission = async (SubmissionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + SubmissionId, config)

  return response.data
}

const submissionService = {
  addSubmission,
  getSubmissions,
  updateSubmission,
  deleteSubmission,
}

export default submissionService
