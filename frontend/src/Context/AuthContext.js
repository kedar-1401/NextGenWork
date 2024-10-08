import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  // if (!authToken) {
  //   setAuth(false);
  //   navigate("/"); // Redirect to home if no token is present
  //   return;
  // }
  const [auth, setAuth] = useState(!!localStorage.getItem("authToken")); 
  const [activeUser, setActiveUser] = useState({})
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })


  useEffect(() => {

    const controlAuth = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setAuth(false);
          navigate("/"); // Redirect to home if no token is present
          return;
        }

       
        const responce = await fetch("http://localhost:5000/auth/private", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!responce.ok) {
          throw new Error("Unauthorized"); // Trigger catch block if response is not okay
        }
        const data=await responce.json();
        // const { data } = await axios.get("/auth/private", config);
        setActiveUser(data.user)
        setAuth(true);
      }
      catch (error) {

        localStorage.removeItem("authToken");

        setActiveUser({})
      }
    };
    controlAuth()

  }, [])

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
