import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "../Page/Registration";
import ROUTE from "../Config/constant";
import Employer from "../Page/Employer";
import FeelencerDetail from "../Page/FreelencerDetail";
import LoginPage from "../Page/Login";
import ProfilePage from "../Page/Profile";
import { useUser } from "../UserContext";

const AppRoutes = () => {
  const { user } = useUser();
  return (
    <Routes>
      <Route
        path="/"
        element={
          user && Object.keys(user).length > 0 ? (
            <Navigate to={ROUTE.PROFILE} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTE.REGISTRATION} element={<Registration />} />
      <Route path={ROUTE.EMPLOYER} element={<Employer />} />
      <Route path={ROUTE.DETAIL} element={<FeelencerDetail />} />
      <Route path={ROUTE.FREELENCER} element={<FeelencerDetail />} />
      <Route path={ROUTE.FREELENCER} element={<FeelencerDetail />} />
      <Route path={ROUTE.JOB_LIST} element={<Employer />} />
    </Routes>
  );
};

export default AppRoutes;
