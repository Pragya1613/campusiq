import {
  createContext,
  useState,
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    sessionStorage.getItem("token") || null
  );

  const [role, setRole] = useState(
    sessionStorage.getItem("role") || null
  );

  const login = (newToken, newRole) => {
    sessionStorage.setItem("token", newToken);

    sessionStorage.setItem("role", newRole);

    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    sessionStorage.removeItem("token");

    sessionStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;