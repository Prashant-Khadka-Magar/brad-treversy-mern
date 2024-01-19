import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { addGoals } from "../features/goals/goalSlice";

function AddGoals() {
  const [userInput, setUserInput] = useState("");
  const dispatch=useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addGoals(userInput))

  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default AddGoals;
