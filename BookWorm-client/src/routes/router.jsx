import { createBrowserRouter, Navigate } from 'react-router';

import HomeLayout from '../Layouts/HomeLayout/HomeLayout';
import DashBoardLayout from '../Layouts/DashboardLayout/DashboardLayout';

// Common Pages
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NotFound from '../pages/NotFound/NotFound';
import BookDetails from '../pages/BookDetails/BookDetails';

// User Pages
import UserHome from '../pages/Dashboard/User/UserHome';
import BrowseBooks from '../pages/BrowseBooks/BrowseBooks';
import MyLibrary from '../pages/Dashboard/User/MyLibrary';
import Tutorials from '../pages/Tutorials/Tutorials';

// Admin Pages
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import ManageBooks from '../pages/Dashboard/Admin/ManageBooks ';
import ManageGenres from '../pages/Dashboard/Admin/ManageGenres';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import ModerateReviews from '../pages/Dashboard/Admin/ModerateReviews';
import ManageTutorials from '../pages/Dashboard/Admin/ManageTutorials';
import Profile from '../pages/Profile/Profile';
import AdminRoute from '../Components/PrivateRoute/AdminRoute';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';
import Terms from '../pages/Terms/Terms';
import Privacy from '../pages/Privacy/Privacy';
import Help from '../pages/Help/Help';
import Forbidden from '../pages/Forbidden/Forbidden';

// Note: If you have a PrivateRoute/AdminRoute, apply them to the "element" prop
// Example: element: <PrivateRoute><MyLibrary /></PrivateRoute>

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />, // This layout contains Navbar and Footer
    children: [
      // --- Public/Auth Routes ---
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'terms',
        element: <Terms></Terms>,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'forbidden',
        element: <Forbidden />,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // --- Main Application/User Routes ---
      {
        index: true,
        element: <Navigate to="/my-library" />, // Default landing page
      },
      {
        path: 'home',
        element: <UserHome />,
      },
      {
        path: 'browse-books',
        element: <BrowseBooks />,
      },
      {
        path: 'my-library',
        element: (
          <PrivateRoute>
            <MyLibrary />
          </PrivateRoute>
        ),
      },
      {
        path: 'book-details/:id',
        element: <BookDetails />,
      },
      {
        path: 'tutorials',
        element: <Tutorials />,
      },
    ],
  },

  // --- Admin Dashboard Routes ---
  {
    path: '/admin-dashboard',
    element: (
      <PrivateRoute>
        <AdminRoute>
          <DashBoardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-books',
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-genres',
        element: (
          <AdminRoute>
            <ManageGenres />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'moderate-reviews',
        element: (
          <AdminRoute>
            <ModerateReviews />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-tutorials',
        element: (
          <AdminRoute>
            <ManageTutorials />
          </AdminRoute>
        ),
      },
    ],
  },

  // --- 404 Route ---
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
