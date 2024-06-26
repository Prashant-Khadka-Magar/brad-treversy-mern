import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoals, fetchGoals } from "../features/goals/goalSlice";
import Spinner from "./Spinner";

function DisplayGoals() {
  const { goals, isLoading } = useSelector((state) => state.goal);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    dispatch(deleteGoals(id));
  };

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

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
            <li key={goal._id} className="flex flex-col  mt-2 bg-slate-400">
              <section className="flex gap-x-4">
                <p>{goal.text}</p>
                {user && goal.user === user._id && (
                  <button
                    className="bg-red-500 text-white px-2"
                    onClick={() => deletehandler(goal._id)}
                  >
                    X
                  </button>
                )}
              </section>
              <section>
                <h2>{new Date(goal.createdAt).toLocaleString()}</h2>
              </section>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DisplayGoals;
