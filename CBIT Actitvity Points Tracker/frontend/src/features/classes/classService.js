import axios from 'axios'

const API_URL = 'http://localhost:9000/api/classes/'

// Create new goal
const addClass = async (ClassData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ClassData, config)

  return response.data
}

// Get all classes
const getClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete Class
const deleteClass = async (ClassId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + ClassId, config)

  return response.data
}

const classService = {
  addClass,
  getClasses,
  deleteClass,
}

export default classService
