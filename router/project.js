const express = require("express");
const projects = require("../router_handler/project");

const router = express.Router();

router.get("/projects", projects.projects);
router.get("/workers", projects.workers);

module.exports = router;
