import axios from 'axios'

const API_URL = 'http://localhost:9000/api/activities/'

// Create new goal
const addActivity = async (ActivityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ActivityData, config)

  return response.data
}

// Get all Activities
const getActivities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete Activity
const deleteActivity = async (ActivityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + ActivityId, config)

  return response.data
}

const activityService = {
  addActivity,
  getActivities,
  deleteActivity,
}

export default activityService
