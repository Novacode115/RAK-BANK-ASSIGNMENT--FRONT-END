import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Error from "./pages/error";
import Success from "./pages/success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
