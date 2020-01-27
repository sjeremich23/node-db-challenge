const express = require("express");
const helmet = require("helmet");

const ProjectsRouter = require("./projects/router");
const ResourcesRouter = require("./resources/router");
const TasksRouter = require("./tasks/router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/projects", ProjectsRouter);
server.use("/api/resources", ResourcesRouter);
server.use("/api/tasks", TasksRouter);

server.get("/", (req, res) => {
  res.send({
    Server: "Hi, I'm your Server.  Can I start you off with a drink?"
  });
});

function logger(req, res, next) {
  const { method, url } = req;
  console.log(
    `[${new Date().toLocaleTimeString()}] ${method} request to URL: ${url}`
  );
  next();
}

module.exports = server;
