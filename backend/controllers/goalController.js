const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

//-----------GET GOALS-------
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//-----------SET GOALS VALUES-------
const setGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  console.log(text);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Enter a text");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//-----------UPDATE GOAL VALUE-------
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    req.status(400);
    throw new Error("Goal not found");
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

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
