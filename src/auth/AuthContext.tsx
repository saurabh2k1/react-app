import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { toast } from "react-toastify";

interface AuthContextType {
  token: string | null;
  userName: string | null;
  avatar: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
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
  

  const login =  (user: User) => {
    setIsLoading(true);
    setToken(user.token);
    setUserName(user.name);
    setAvatar(user.avatar || '');
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  useEffect(() => { 
    const storedUser = localStorage.getItem('user');
    if (storedUser ) {
      const user = JSON.parse(storedUser);
      setToken(user.token);
      setUserName(user.name);
      setAvatar(user.avatar || null);
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
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    toast.info("You have successfully logged out!");    
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
