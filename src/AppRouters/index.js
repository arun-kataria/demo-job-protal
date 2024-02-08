import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "../Page/Registration";
import ROUTE from "../Config/constant";
import Employer from "../Page/Employer";
import FeelencerDetail from "../Page/FreelencerDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path={ROUTE.REGISTRATION} element={<Registration />} />
      <Route path={ROUTE.EMPLOYER} element={<Employer />} />
      <Route path={ROUTE.DETAIL} element={<FeelencerDetail />} />
    </Routes>
  );
};

export default AppRoutes;
