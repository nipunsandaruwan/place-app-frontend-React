import "./App.css";
import React, { useContext, useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import Register from "./user/pages/Register";
import { AuthContext } from "./context/auth-context";
import Footer from "./shared/components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact element={<Users />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/places/new" exact element={<NewPlace />} />
        <Route path="/places/:placeId" exact element={<UpdatePlace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" exact element={<Users />} />
        <Route path="/:userId/places" exact element={<UserPlaces />} />
        <Route path="/auth/login" exact element={<Auth />} />
        {/* <Route path="/places/:placeId" exact element={<UpdatePlace />} /> */}
        <Route path="/auth/register" exact element={<Register />} />
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          // token: token,
          login: login,
          logout: logout,
          userId: userId,
        }}
      >
        <div className="place__app">
          <MainNavigation />
          <main>
            <Routes>{routes}</Routes>
          </main>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
