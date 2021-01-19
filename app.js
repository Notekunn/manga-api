const express = require('express');
const app = express();
const userRouter = require('./api/routes/user.route');
const artistRoute = require('./api/routes/artist.route');
const categoryRoute = require('./api/routes/category.route');
const translatorGroupRoute = require('./api/routes/translator-group.route');
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
app.use("/artists", artistRoute);
app.use("/categories", categoryRoute);
app.use("/translator-groups", translatorGroupRoute);


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