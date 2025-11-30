import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  

  const location = window.location;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);

         
        }
      } catch (err) {
        setIsAuthenticated(false);
       
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <></>; // no loader
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message:`You must be logged in to access ${location.pathname}.`,
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
