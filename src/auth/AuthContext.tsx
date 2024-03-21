import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  userName: string | null;
  avatar: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userName: string, avatar: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null >(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const login =  (token: string, userName: string, avatar: string|null) => {
    setIsLoading(true);
    setToken(token);
    setUserName(userName);
    setAvatar(avatar);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('avatar', avatar || '');
    setIsLoading(false);
    
  };

  useEffect(() => { 
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setAvatar(storedAvatar || null);
      setIsLoggedIn(true);
    }
   }, []);

  // const verifyToken = (token: string) => {
  //   try {
  //     setIsLoading(true);
  //     const decoded = jwtDecode<MyJwtType>(token);
  //     const expiresAt = decoded.exp;
  //     if (expiresAt < Date.now() / 1000) {
  //       return false;
  //     }

  //     return true;
  //   } catch (error) {
  //     console.error("Error verifying token:", error);
  //     return false;
  //     // Handle API errors and display user-friendly messages
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  



  const logout = () => {
    setToken(null);
    setUserName(null);
    setAvatar(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('avatar');
    
  };

 

  return (
    <AuthContext.Provider
      value={{ token, userName, avatar, isLoading, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
