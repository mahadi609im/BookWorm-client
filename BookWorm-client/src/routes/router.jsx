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

import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  // --- Public Routes ---
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // --- Main Layout (Common for all for now) ---
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomeLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/my-library" />, // Direct redirect to Library
      },
      {
        path: 'dashboard',
        element: <UserHome />,
      },
      {
        path: 'browse-books',
        element: <BrowseBooks />,
      },
      {
        path: 'my-library',
        element: <MyLibrary />,
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

  // --- Admin Dashboard (Direct Access for testing) ---
  {
    path: '/admin-dashboard',
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'manage-books',
        element: <ManageBooks />,
      },
      {
        path: 'manage-genres',
        element: <ManageGenres />,
      },
      {
        path: 'manage-users',
        element: <ManageUsers />,
      },
      {
        path: 'moderate-reviews',
        element: <ModerateReviews />,
      },
      {
        path: 'manage-tutorials',
        element: <ManageTutorials />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
