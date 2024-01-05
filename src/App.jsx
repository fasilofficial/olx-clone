import React, { useEffect, useContext, lazy, Suspense } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authContext, firebaseContext } from "./store/Context";
import Post from "./store/PostContext";

import Loading from "./components/Loading/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));
const PostPage = lazy(() => import("./pages/PostPage"));

const App = () => {
  const { setUser } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="main">
        <Post>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/view" element={<PostPage />} />
            </Routes>
          </Suspense>
        </Post>
      </div>
    </BrowserRouter>
  );
};

export default App;
