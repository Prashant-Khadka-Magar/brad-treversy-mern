import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const { name, email, password, password2 } = formData;
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
