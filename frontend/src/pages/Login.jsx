import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password } = formData;
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

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <h1>Login User</h1>
      <form
        className="flex flex-col gap-y-3 mt-5 justify-center"
        onSubmit={submitHandler}
      >
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

        <button type="submit" className="bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
