import TasksModel from "../models/TasksModel.js";

export const CreateTask = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await TasksModel.create(reqBody);
    return res.json({
      status: "success",
      message: "New task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create task",
      error: err.message,
    });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    await TasksModel.updateOne({ _id: id, user_id: user_id }, reqBody);
    return res.json({
      status: "success",
      message: "Task updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update task",
      error: err.message,
    });
  }
};

export const TaskList = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let status = req.params.status;
    let data = await TasksModel.find({ user_id: user_id, status: status });
    return res.json({
      status: "success",
      message: "Task list fetched successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch task list",
      error: err.message,
    });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.headers.user_id;
    await TasksModel.deleteOne({ _id: id, user_id: user_id });
    return res.json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete task",
      error: err.message,
    });
  }
};

export const CountTask = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let count = await TasksModel.countDocuments({ user_id: user_id });
    return res.json({ status: "success", count: count });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to count tasks",
      error: err.message,
    });
  }
};
