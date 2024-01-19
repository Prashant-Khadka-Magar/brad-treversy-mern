import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="flex justify-between">
      <section>
        <Link to="/">GOAL SETTER</Link>
      </section>
      <ul className="flex gap-x-4 mr-4">
        {user ? (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
