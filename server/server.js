const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const {PORT, MONGO_URI, SESSION_SECRET} = process.env;

const app = express();

userRouter = require("./routes/users");

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.error(err);
	});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const passportConfig = require("./config/passportConfig");
passportConfig(passport);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
