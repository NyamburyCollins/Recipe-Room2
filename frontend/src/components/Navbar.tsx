import React from 'react'; 
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div className="container">
      
      <Link to="/" className="navbar-brand fs-3 fw-bold text-warning">
        Recipe‑Room
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `nav-link mx-2 ${isActive ? 'text-warning fw-bold' : 'text-white'}`
              }
            >
              Create Recipe
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link mx-2 ${isActive ? 'text-warning fw-bold' : 'text-white'}`
              }
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `nav-link mx-2 ${isActive ? 'text-warning fw-bold' : 'text-white'}`
              }
            >
              Register
            </NavLink>
          </li>
        </ul> 
      </div>
    </div>
  </nav>
);

export default Navbar;