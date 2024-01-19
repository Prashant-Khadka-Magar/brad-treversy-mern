const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//-----------GET GOALS-------
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//-----------SET GOALS VALUES-------
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Enter a text");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//-----------UPDATE GOAL VALUE-------
const updateGoal = asyncHandler(async (req, res) => {
  //it finds the document with id given in the params
  const goal = await Goal.findById(req.params.id);

  //check if that document exist
  if (!goal) {
    req.status(400);
    throw new Error("Goal not found");
  }

  //CHECK for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //Make sure the logged in user matches the goal user
  console.log(goal.user);
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//-----------DELETE GOAL-------
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //CHECK for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
