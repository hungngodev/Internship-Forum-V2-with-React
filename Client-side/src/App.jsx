import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  ShowInternship,
  EditInternship,
  DeleteInternship,
  Setting,
  Error,
  CreateReview,
  RestrictedPage,
} from "./pages";

import { loader as HomeLayoutLoader } from "./pages/HomeLayout";
import { action as registerAction } from "./pages/Register";
import { loader as registerLoader } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as loginLoader } from "./pages/Login";
// import { loader as internshipLoader } from './pages/IntershipLayout';
import { action as addInternshipAction } from "./pages/AddInternship";
import { loader as addInternshipLoader } from "./pages/AddInternship";
import { action as deleteInternshipAction } from "./pages/DeleteInternship";
import { loader as allInternshipsLoader } from "./pages/AllInternships";
import { loader as profileLoader } from "./pages/Profile";
import { loader as showInternshipLoader } from "./pages/ShowInternship";
import { loader as editInternshipLoader } from "./pages/EditInternship";
import { action as editInternshipAction } from "./pages/EditInternship";
import { loader as settingLoader } from "./pages/Setting";
import { loader as statsLoader } from "./pages/Stats";
// import ErrorElement from './components/ErrorElement';
import { action as CreateReviewAction } from "./pages/CreateReview";
import { action as DeleteReviewAction } from "./pages/DeleteReview";
import { action as editSettingAction } from "./pages/EditSetting";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeLayout queryClient={queryClient} />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction(queryClient),
        loader: registerLoader(queryClient),
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
        loader: loginLoader(queryClient),
      },
      {
        path: "profile/:id",
        element: <Profile />,
        loader: profileLoader(queryClient),
      },
      {
        path: "setting",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Setting />,
            loader: settingLoader(queryClient),
          },
          {
            path: "edit",
            element: <RestrictedPage />,
            action: editSettingAction(queryClient),
          },
        ],
      },
      {
        path: "statistics",
        element: <Stats />,
        loader: statsLoader(queryClient),
      },
      {
        path: "internships",
        element: <InternshipLayout />,
        children: [
          {
            index: true,
            element: <AllInternships />,
            loader: allInternshipsLoader(queryClient),
          },
          {
            path: ":id",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <ShowInternship />,
                loader: showInternshipLoader(queryClient),
              },
              {
                path: "edit",
                element: <EditInternship />,
                loader: editInternshipLoader(queryClient),
                action: editInternshipAction(queryClient),
              },
              {
                path: "delete",
                action: deleteInternshipAction(queryClient),
                element: <RestrictedPage />,
              },
              {
                path: "review",
                element: <RestrictedPage />,
                action: CreateReviewAction(queryClient),
              },
              {
                path: "review/:reviewId",
                action: DeleteReviewAction(queryClient),
                element: <RestrictedPage />,
              },
            ],
          },
          {
            path: "new",
            element: <AddInternship />,
            action: addInternshipAction(queryClient),
            loader: addInternshipLoader(queryClient),
          },
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
