import { TOKEN } from '@/utils/constants';
import { FC, createContext, useState, useContext } from 'react';

type AuthStatus = {
  username: string;
  token: string;
};

type AuthContextType = {
  username: string;
  isAuthenticated: boolean;
  updateAuthStatus: (authParam: AuthStatus) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<IProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthStatus = ({ username, token }: AuthStatus) => {
    setUsername(username);
    setIsAuthenticated(!!token);

    !!token
      ? localStorage.setItem(TOKEN, token)
      : localStorage.removeItem(TOKEN);
  };

  const providerValue = {
    username,
    isAuthenticated,
    updateAuthStatus,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
