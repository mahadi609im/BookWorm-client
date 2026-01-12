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
        path: 'profile',
        element: <Profile />,
      },

      // --- Main Application/User Routes ---
      {
        index: true,
        element: <Navigate to="/my-library" />, // Default landing page
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

  // --- Admin Dashboard Routes ---
  {
    path: '/admin-dashboard',
    element: <DashBoardLayout />, // Usually contains a Sidebar and Sidebar-Header
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

  // --- 404 Route ---
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
