import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

function PrivateRoute({ children }) {

  const user  = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;