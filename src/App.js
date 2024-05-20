import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import Login from "./views/Login";
import Plan from "./views/Plan";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
