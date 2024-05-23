import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css"
import Main from "./views/Main"
import HomeView from "./views/HomeView";
import PlannedView from "./views/PlannedView"
import Login from "./views/Login";
import Plan from "./views/Plan";
import SignUp from "./components/SignUp"

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
      </Routes>
    </BrowserRouter>
  );
}
export default App;