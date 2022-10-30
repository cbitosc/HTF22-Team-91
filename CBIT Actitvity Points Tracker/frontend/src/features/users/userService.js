import axios from 'axios'

const API_URL = 'http://localhost:9000/api/users/'

// Add new admin
const addAdmin = async (UserData) => {
  const response = await axios.post(API_URL + 'registerAdmin', UserData)
  return response.data
}

// Add new mentor or student
const addUser = async (UserData) => {
  const response = await axios.post(API_URL + 'register', UserData)
  return response.data
}

// Get all managers
const getStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'students', config)

  return response.data
}

// Get all employees
const getMentors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'mentors', config)

  return response.data
}

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + userId, config)

  return response.data
}

const userService = {
  addUser,
  addAdmin,
  getStudents,
  getMentors,
  deleteUser,
}

export default userService
