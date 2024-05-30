import axios from 'axios';

const server = 'https://16.170.210.194:3000/api';

const instance = axios.create({
  baseURL: server,
});

instance.interceptors.request.use((request) => {

  const token = localStorage.getItem('token')
  
  request.headers = {
    'Accept': "application/json, text/plain, */*",
    'x-access-token': token,
    'Content-Type' : 'application/json'
  }
  return request
});

instance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error
    )
)

export default instance;
