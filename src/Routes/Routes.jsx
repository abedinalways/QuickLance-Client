import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Pages/Root/Root';
import Home from '../Pages/Home/Home';
import AddTask from '../Pages/AddTask/AddTask';
import BrowseTasks from '../Pages/BrowseTasks/BrowseTasks';
import TaskDetails from '../Pages/TaskDetails/TaskDetails';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import PrivateRoute from './PrivateRoute';
import PostedTasks from '../Pages/PostedTasks/PostedTasks';
import UpdateTask from '../Pages/UpdateTask/UpdateTask';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        path: '/',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () =>
          fetch(
            'https://quick-lance-server-hd5bht5fm-abedinalways-projects.vercel.app/tasks'
          ),
        Component: Home,
      },
      {
        path: '/addTask',
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: '/browseTask',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () =>
          fetch(
            'https://quick-lance-server-hd5bht5fm-abedinalways-projects.vercel.app/allTasks'
          ),
        Component: BrowseTasks,
      },
      {
        path: '/allTasks/:id',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: async ({ params }) =>
          fetch(
            `https://quick-lance-server-hd5bht5fm-abedinalways-projects.vercel.app/allTasks/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/postedTasks',
        element: (
          <PrivateRoute>
            <PostedTasks />
          </PrivateRoute>
        ),
      },
      {
        path: '/updateTask/:id',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: ({ params }) =>
          fetch(
            `https://quick-lance-server-hd5bht5fm-abedinalways-projects.vercel.app/allTasks/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
]);

export default router;
