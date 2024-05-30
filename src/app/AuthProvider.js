import AuthContext from '../app/AuthContext';
import useProvideAuth from '../app/useProvideAuth';

function AuthProvider({ children }) {

  const auth = useProvideAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;