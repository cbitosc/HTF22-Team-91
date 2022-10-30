import axios from 'axios'

const API_URL = 'http://localhost:9000/api/users/'

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Update user
const updateUser = async (userData, token, id) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        //   "Content-Type": "multipart/form-data",
        },
    }
    const response = await axios.put(API_URL + id, userData, config)
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    updateUser,
    login,
    logout,
}

export default authService