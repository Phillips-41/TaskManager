import { createContext, useState, useContext } from "react";
import { executeJwtAuthenticationService } from "../security/AuthenticationApiService";
import { apiClient } from "./ApiClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);

  //     if (response.status == 200) {
  //       setAuthenticated(true);
  //       setToken(baToken);
  //       setUsername(username);
  //       apiClient.interceptors.request.use((config) => {
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     logout();
  //     return false;
  //   }
  // }
  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        const Jtoken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setToken(Jtoken);
        setUsername(username);
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = Jtoken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
