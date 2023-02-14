import { FC, createContext, useState, useContext } from 'react';

type AuthContextType = {
  username: string;
  updateUsername: (username: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<IProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');

  const updateUsername = (name: string) => {
    setUsername(name);
  };

  const providerValue = {
    username,
    updateUsername,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
