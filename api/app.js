const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const cors = require("cors");
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL; // DB connection
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	if(process.env.NODE_ENV !== "test") { //don't show the log when it is test
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n Press CTRL + C to stop the process. \n");
	}
}).catch(err => {
	console.error("App starting error:", err.message); process.exit(1);
});
const db = mongoose.connection;
const app = express();
if(process.env.NODE_ENV !== "test") app.use(logger("dev"));//don't show the log when testing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());//To allow cross-origin requests
//Routes
app.use("/", indexRouter);
app.use("/api/", apiRouter);
app.all("*", function(req, res) { return apiResponse.notFoundResponse(res, "Page not found"); });// throw 404 if URL not found 
app.use((err, req, res) => { if(err.name == "UnauthorizedError") return apiResponse.unauthorizedResponse(res, err.message); });
module.exports = app;
