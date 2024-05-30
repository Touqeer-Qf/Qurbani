import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProvideAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));

  const login = (data) => {
    setUser(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    setUser(token)
  };

  return { user, setUser, login, logout, verifyToken };
};

export default useProvideAuth;