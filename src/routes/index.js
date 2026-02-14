const express = require("express");
const router = express.Router();

const indexRoutes = require("./index.routes");

router.use("/", indexRoutes);

module.exports = router;
