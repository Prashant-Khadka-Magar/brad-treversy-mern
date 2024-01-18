import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between">
      <section>
        <Link to="/">GOAL SETTER</Link>
      </section>
      <ul className="flex gap-x-4 mr-4">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
