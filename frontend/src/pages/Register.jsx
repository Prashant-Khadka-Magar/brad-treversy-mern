import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <h1>Register User</h1>
      <form
        className="flex flex-col gap-y-3 mt-5 justify-center"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={changeHandler}
          placeholder="enter username"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="enter email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          placeholder="enter password"
        />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={changeHandler}
          placeholder="confirm password"
        />
        <button type="submit" className="bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
