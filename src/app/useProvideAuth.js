import { useState } from 'react';

const useProvideAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));
  const [name, setName] = useState(localStorage.getItem('name'));

  const login = (data) => {
    setUser(data.token);
    setName(data.name);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
  };

  const logout = () => {
    setUser(null);
    setName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    setUser(token)
  };

  return { user, name, setUser, login, logout, verifyToken };
};

export default useProvideAuth;