import axios from 'axios';

const server = 'https://a9b9-51-20-176-204.ngrok-free.app/api';

const instance = axios.create({
  baseURL: server,
});

instance.interceptors.request.use((request) => {

  const token = localStorage.getItem('token')
  
  request.headers = {
    'Accept': "application/json, text/plain, */*",
    'x-access-token': token,
    'Content-Type' : 'application/json',
    'ngrok-skip-browser-warning':'true'
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
