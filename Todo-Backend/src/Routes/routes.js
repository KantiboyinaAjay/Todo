const express = require("express");

const Router = express.Router();

const TodoControllers = require("../Controllers/controller");

Router.post("/addProject", TodoControllers.addProjects);

Router.post("/addTask", TodoControllers.addTask);

Router.get("/getProjects", TodoControllers.getProjects);

Router.get("/getTasks/:pid", TodoControllers.getTasksbyId);

Router.put("/updateTask", TodoControllers.updateTasksbyId);

Router.delete("/deleteProject/:pid", TodoControllers.deleteProject);

module.exports = Router;
