const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan"); /// Morgan is a logging middleware used for logging HTTP requests and responses in Node.js applications. It helps with debugging and monitoring server behavior.
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt"); // Mongoose is an Object Data Modeling (ODM) library for MongoDB in Node.js. It provides a higher-level abstraction for working with MongoDB databases, including defining schemas, models, and convenient methods for CRUD operations.
uri = process.env.URI;
process.env.SECRET;
const PORT = process.env.PORT || 8100;

app.use(express.json()); // Used to parse and handle JSON data sent in the request body of an HTTP request. Accessible by request.body
app.use(morgan("dev")); // It generates concise log messages to the console, providing information such as the HTTP method, URL, response status code, response time,etc...

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to the DB");
    })
    .catch((error) => {
        console.error("Error connecting to the DB", error);
    });

//middleware//
// app.use("/sauces", require("./routes/sauceRouter.js"))
app.use(
    "/api",
    expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/auth", require("./routes/authRouter.js"));
app.use("/api/sauce", require("./routes/sauceRouter.js"));
app.use("/api/comment", require("./routes/commentRouter.js"));

//Error handler/s
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log("The server is running on port ${PORT}");
});
