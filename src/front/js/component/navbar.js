import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Logout } from "./logout";
export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Luxury Estate</span>
        </Link>

        {store.token ? (
          <div className="d-flex align-items-center">
            <Link to={`/user/${localStorage.getItem("id")}`}>
              <i className="fa-solid fa-user me-3 fs-2 "></i>
            </Link>
            <Logout />
          </div>
        ) : (
          <div className="ms-auto">
            <Link to="/login">
              <a href="#" className="btn btn-success">
                Login
              </a>
            </Link>
            <Link to="/signup">
              <a href="#" className="btn btn-outline-success">
                Signup
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
