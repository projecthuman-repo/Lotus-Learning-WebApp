import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * The AuthProvider component is a wrapper that provides authentication functionality to its children
 * components.
 * @returns The AuthProvider component is being returned.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const login = (newToken, accountType) => {
    setToken(newToken);
    setAccountType(accountType);
  };

  const logout = () => {
    setToken(null);
    setAccountType(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
