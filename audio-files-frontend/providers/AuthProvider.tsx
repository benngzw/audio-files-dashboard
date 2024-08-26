import { useContext, createContext, useState } from "react";
import { redirect } from "next/navigation";

const AuthContext = createContext({
  user: null,
  token: "",
  loginAction: (username: string, password: string) => { console.log(`user: ${username}, password: ${password}`) },
});

import { ReactNode } from "react";
import axios from "axios";
import { log } from "console";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const loginAction = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      }, {
        withCredentials: true
      })
      console.log(response.data);

      redirect("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};