import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler=(e)=>{
    e.preventDefault();
  }

  const { name, email, password, password2 } = formData;
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
