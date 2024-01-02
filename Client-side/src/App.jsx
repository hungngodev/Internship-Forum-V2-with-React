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
  Error,
} from './pages';

// import { action as registerAction } from './pages/Register';
// import { action as loginAction } from './pages/Login';
// import { loader as internshipLoader } from './pages/IntershipLayout';
// import { action as addInternshipAction } from './pages/AddInternship';
// import { loader as allInternshipsLoader } from './pages/AllInternships';
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
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      // {
      //   path: 'register',
      //   element: <Register />,
      //   action: registerAction,
      // },
      // {
      //   path: 'login',
      //   element: <Login />,
      //   action: loginAction(queryClient),
      // },
      // {
      //   path: 'profile/:id',
      //   element: <Profile />,
      //   action: profileAction(queryClient),
      // },
      // {
      //   path: 'statistics',
      //   element: <Stats />,
      //   loader: statsLoader(queryClient),
      //   errorElement: <ErrorElement />,
      // },
      // {
      //   path: 'interships',
      //   element: <InternshipLayout queryClient={queryClient} />,
      //   loader: internshipLoader(queryClient),
      //   children: [
      //     {
      //       index: true,
      //       element: <AddInternship />,
      //       action: addInternshipAction(queryClient),
      //     },
      //     {
      //       path: 'internships',
      //       element: <AllInternships />,
      //       loader: allInternshipsLoader(queryClient),
      //       errorElement: <ErrorElement />,
      //     },
      //     {
      //       path: ':id/edit',
      //       element: <EditInternship />,
      //       loader: editInternshipLoader(queryClient),
      //       action: editInternshipAction(queryClient),
      //     },
      //     // { path: 'delete-job/:id', action: deleteJobAction(queryClient) },
      //   ],
      // },
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
