import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css"
import Main from "./views/Main"
import HomeView from "./views/HomeView";
import PlannedView from "./views/PlannedView"
import Login from "./views/Login";
import Plan from "./views/Plan";
import SignUp from "./components/SignUp"
import PlandetailFree from "./views/Plandetail_free";
import PlandetailPremeditated from "./views/Plandetail_premeditated";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/free" element={<HomeView />} />
        <Route path="/planned" element={<PlannedView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plandetail_free" element={<PlandetailFree />} />
        <Route path="/plandetail_premeditated" element={<PlandetailPremeditated />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;