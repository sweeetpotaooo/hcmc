import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css"
import HomeView from "./views/HomeView";
import Login from "./views/Login";
import Plan from "./views/Plan";
import SignUp from "./components/SignUp"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;