import { useContext } from 'react';
import AuthContext from '../app/AuthContext';

const useAuth = () => useContext(AuthContext)

export default useAuth;