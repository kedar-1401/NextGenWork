import { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Home from '../GeneralScreens/Home';
import { AuthContext } from "../../Context/AuthContext";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem("authToken")); // Initialize state directly based on localStorage
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setActiveUser, setConfig } = useContext(AuthContext);

  useEffect(() => {
    const controlAuth = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setAuth(false);
        navigate("/"); // Redirect to home if no token is present
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      };

      try {
        const response = await fetch("http://localhost:5000/auth/private", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error("Unauthorized"); // Trigger catch block if response is not okay
        }

        const data = await response.json();

        setAuth(true);
        setActiveUser(data.user);
        setConfig(config);

      } catch (error) {
        console.log("Error in pivate route");
        
        localStorage.removeItem("authToken");
        setAuth(false);
        setActiveUser({});
        setError("You are not authorized, please login");
        navigate("/"); // Redirect on unauthorized access
      }
    };

    controlAuth();
  }, [navigate]);

  return auth ? <Outlet /> : <Home error={error} />;
};

export default PrivateRoute;
