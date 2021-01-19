const express = require('express');
const app = express();
const userRouter = require('./api/routes/user.route');
const artistRouter = require('./api/routes/artist.route');
const categoryRouter = require('./api/routes/category.route');
const morgan = require('morgan');
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.get("/", function (req, res) {
    res.send("Hello");
});
app.use("/users", userRouter);
app.use("/artists", artistRouter);
app.use("/categories", categoryRouter);

app.use(function (req, res, next) {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})

app.use(function (error, req, res, next) {
    if (!error.message) error.message = "Syntax Error";
    res.status(error.status || 500)
        .json({
            error: {
                ...error,
                message: error.message + "!"
            }
        });
})

module.exports = app;