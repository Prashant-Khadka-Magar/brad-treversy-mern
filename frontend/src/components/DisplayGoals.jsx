import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoals, fetchGoals } from "../features/goals/goalSlice";
import Spinner from "./Spinner";

function DisplayGoals() {
  const { goals, isLoading } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    dispatch(deleteGoals(id));
  };

  useEffect(() => {
    // Dispatch the fetchGoals action
    dispatch(fetchGoals());
  }, [dispatch]);

  // Log goals whenever the goals state changes
  useEffect(() => {
    console.log(goals);
  }, [goals]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <ul>
        {goals &&
          goals.map((goal) => (
            <li key={goal._id} className="flex gap-x-4 mt-2 bg-slate-400">
              <p>{goal.text}</p>
              <button
                className="bg-blue-500 text-white px-2"
                onClick={() => deletehandler(goal._id)}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DisplayGoals;
