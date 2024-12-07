import loadingGif from './assets/loader.gif';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
// import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import useauthStore from './store/useAuthStore';
import ChatPage2 from './pages/ChatPage2';


const App = () => {
  const { checkAuth, user, isCheckingAuth } = useauthStore();

  


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth) return (
    <div className='flex justify-center items-center h-screen'>
      <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
    </div>
  );

  return (
    <div className="bg-gradient-to-br overflow-hidden from-blue-200 via-pink-200 to-purple-200">
      <Routes>

        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />


        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />


        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />


        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        // element={<ProfilePage />}
        />


        <Route
          path="/chat/:id"
          element={user ? <ChatPage2 /> : <Navigate to="/login" />}
        />
      </Routes>

      <ToastContainer />

    </div>
  );
};

export default App;
