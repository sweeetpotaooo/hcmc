import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import Login from "./views/Login";
import Plan from "./views/Plan";
import PlandetailFree from "./views/Plandetail_free";
import PlandetailPremeditated from "./views/Plandetail_premeditated";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plandetail_free" element={<PlandetailFree />} />
        <Route
          path="/plandetail_premeditated"
          element={<PlandetailPremeditated />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
