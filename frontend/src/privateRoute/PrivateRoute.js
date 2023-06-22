//PrivateRoute.js
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
 
const PrivateRoute = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.auth.user);
console.log(auth)
  const location = useLocation();

  if( auth== undefined||!auth.roles){
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return (
    //   auth?.roles?.find(role => allowedRoles?.includes(role))
      allowedRoles.every(role => Object.values(auth.roles).includes(role))

          ? <Outlet />
          :auth
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/login" state={{ from: location }} replace />
  );
}


export default PrivateRoute;  