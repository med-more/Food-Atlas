import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaEnvelope, FaCog, FaUtensils } from "react-icons/fa";
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span>Food Atlas</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </Link>
          </li>
          <li>
            <Link to="/recettes" className="navbar-link">
              <FaBook className="nav-icon" />
              <span>Recettes</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              <FaEnvelope className="nav-icon" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/gestion" className="navbar-link">
              <FaCog className="nav-icon" />
              <span>Admin</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
