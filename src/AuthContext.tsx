import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { axiosInstance } from "./index";

interface AuthContextProps {
  user: any;
  login: (values: any) => Promise<void>; // Adjust the type as needed
  logout: () => Promise<void>;
  loading: boolean;
  signup: (values: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // Ensure children prop is of type ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const signup = async (values: any) => {
    try {
      const response = await axiosInstance.post("/auth/signup", values);
      if (response.status !== 409) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const login = async (values: any) => {
    try {
      const response = await axiosInstance.post("/auth/signin", values);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (error) {
      setUser(null);
      console.error(error);
    }
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/auth/check-auth");
        setUser(response.data.user);
        console.log(response.data);
      } catch (error) {
        setUser(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
