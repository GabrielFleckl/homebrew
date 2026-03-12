import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("jwt");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/entrar" />;
};

export default PrivateRoute;
