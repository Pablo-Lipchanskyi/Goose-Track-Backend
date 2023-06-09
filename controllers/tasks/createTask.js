const { catchAsync } = require("../../utils");

const { addTask } = require("../../services/tasksServices");

const createTaskController = catchAsync(async (req, res, next) => {
  const { body: newTask } = req;
  const { _id: owner } = req.user;

 const task = await addTask(newTask, owner);
  res
    .status(201)
    .json({ message: 'Success. Task was created.', task});
});

module.exports = createTaskController;