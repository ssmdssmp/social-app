import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import Loginpage from "./pages/Loginpage";
import PostPage from "./pages/PostPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "./hooks/userHooks";

const router = createBrowserRouter([
  {
    path: "/feed",
    element: <Homepage />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/person/:id",
    element: <Profilepage />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/register",
    element: <Loginpage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUserLocal = localStorage.getItem("currentUser");
    if (currentUserLocal !== null) {
      //@ts-ignore
      dispatch(login(JSON.parse(currentUserLocal)));
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
