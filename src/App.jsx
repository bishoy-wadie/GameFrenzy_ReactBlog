import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/Home/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import UserProfile from "./Pages/User/LoggedUserProfile";
import PostContext from "./context/PostContext";
import PageNotFound from "./Pages/404Page";
import LoggedUserProfile from "./Pages/User/LoggedUserProfile";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<LoggedUserProfile />} />
        <Route path="/:userid" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );

  return (
    <>
      <PostContext.Provider value={{ listOfPosts, setListOfPosts }}>
        <RouterProvider router={router} />
      </PostContext.Provider>
    </>
  );
}

export default App;
