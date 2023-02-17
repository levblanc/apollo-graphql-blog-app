import { TOKEN } from '@/utils/constants';
import { FC, createContext, useState, useContext } from 'react';

type AuthStatus = {
  userId: string;
  username: string;
  email: string;
  token: string;
};

type AuthContextType = {
  userId: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
  updateAuthStatus: (authParam: AuthStatus) => void;
  clearAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<IProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    username: '',
    email: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthStatus = ({ userId, username, email, token }: AuthStatus) => {
    setUserInfo({ userId, username, email });
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN, token);
  };

  // TODO: invalidate token at server side also
  const clearAuthStatus = () => {
    setUserInfo({ userId: '', username: '', email: '' });
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN);
  };

  const providerValue = {
    ...userInfo,
    isAuthenticated,
    updateAuthStatus,
    clearAuthStatus,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
