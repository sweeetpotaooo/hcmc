import React from "react";
import { Link } from "react-router-dom";
import "../style/Menu.scss";

const Menu = () => {
  return (
    <nav className="navBar">
      <Link to="/">Home</Link>
      <Link to="/page1">page1</Link>
      <Link to="/page2">page2</Link>
    </nav>
  );
};

export default Menu;
