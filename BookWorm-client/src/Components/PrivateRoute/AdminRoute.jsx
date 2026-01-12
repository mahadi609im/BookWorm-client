// import { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../../context/AuthContext';
// import Loading from '../Loading/Loading';

// const AdminRoute = ({ children }) => {
//   const { user, role, loading } = useContext(AuthContext);
//   const location = useLocation();

//   // Data fetch hobar shomoy loading spinner dekhabe
//   if (loading) {
//     return <Loading />;
//   }

//   // User login thakle ebong role admin holei children dekhabe
//   if (user && role === 'admin') {
//     return children;
//   }

//   return <Navigate to="/" state={{ from: location }} replace />;
// };

// export default AdminRoute;
