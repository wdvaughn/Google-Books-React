import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/search">
        Find New Books
      </Link>
      <Link className="navbar-brand" to="/saved">
        Books of Interest
      </Link>
    </nav>
  );
}

export default Nav;
