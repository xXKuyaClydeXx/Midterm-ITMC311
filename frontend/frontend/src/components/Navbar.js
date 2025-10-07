import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>Job Portal</h2>
      <ul>
        <li><Link to="/">Browse Jobs</Link></li>
        <li><Link to="/applications">Applications</Link></li>
        <li><Link to="/employer-dashboard">Employer</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
