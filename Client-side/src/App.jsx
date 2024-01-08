import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  Profile,
  Stats,
  InternshipLayout,
  AddInternship,
  AllInternships,
  EditInternship,
  Setting,
  Error,
} from './pages';

import {loader as HomeLayoutLoader} from './pages/HomeLayout';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
// import { loader as internshipLoader } from './pages/IntershipLayout';
// import { action as addInternshipAction } from './pages/AddInternship';
import { loader as allInternshipsLoader } from './pages/AllInternships';
// import { loader as editInternshipLoader } from './pages/EditInternship';
// import { action as editInternshipAction } from './pages/EditInternship';
// import { action as deleteInternshipAction } from './pages/DeleteInternship';
// import { action as profileAction } from './pages/Profile';
// import { loader as statsLoader } from './pages/Stats';
// import ErrorElement from './components/ErrorElement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '',
    element: <HomeLayout queryClient={queryClient} />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction(queryClient),

      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'profile/:id',
        element: <Profile />,
        
      },
      {
        path: 'setting/:id',
        element: <Setting/>,
        
      },
      {
        path: 'statistics',
        element: <Stats />,
    

      },
      {
        path: 'internships',
        element: <InternshipLayout/>,
        children: [
          {
            path:'',
            element: <AllInternships />,
            loader: allInternshipsLoader(queryClient),
          },
          {
            path: 'new',
            element: <AddInternship />,

          },
          {
            path: ':id/edit',
            element: <EditInternship />,

          },
          // { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};
export default App;
