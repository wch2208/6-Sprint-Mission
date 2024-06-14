import { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../api/auth";
import { AuthResponse, User, UserLoginData } from "../types";

interface AuthContextType {
  user: User | null;
  login: (data: UserLoginData) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(data: UserLoginData) {
    try {
      const res: AuthResponse = await loginUser(data);
      setUser(res.user);
    } catch (error) {
      console.error("Failed to login", error);
    }
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
