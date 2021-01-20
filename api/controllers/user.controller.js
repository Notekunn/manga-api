const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;
const SALT = 10;
exports.getAll = async function (req, res, next) {
    try {
        const users = await User.find({}).select(['-password', '-__v']).sort({ createdAt: 1 }).exec();
        res.status(200).send({
            data: users
        })
    } catch (error) {
        next(error);
    }
}
exports.get = async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password -__v').exec();
        if (!user) {
            throw new Error('Không tìm thấy người dùng');
        }
        res.status(200).send(user)
    } catch (error) {
        next(error);
    }
}
exports.create = async function (req, res, next) {
    try {
        const { name, userName, password, email } = req.body;
        const user = new User();
        user.name = name;
        user.userName = userName;
        user.password = bcrypt.hashSync(password, SALT);
        user.email = email;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}
exports.delete = async function (req, res, next) {
    try {
        let id = req.user.isAuthority('moderator') ? req.params.id : req.user._id;
        const result = await User.remove({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
exports.patch = async function (req, res, next) {
    try {
        const id = req.user.isAuthority('moderator') ? req.params.id : req.user._id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
            if (ops.propName == "password") {
                updateOps.password = bcrypt.hashSync(ops.value, SALT);
            }
        }
        const result = await User.updateMany({ _id: id }, { $set: updateOps });
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}
exports.signIn = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ $or: [{ email: email }, { userName: email }] });
        if (!user || !user.comparePassword(password)) {
            const error = new Error("Tài khoản hoặc mật khẩu không đúng")
            error.status = 401;
            throw error;
        }
        return res.json({
            token: jwt.sign({ email: user.email, _id: user._id }, SECRET_KEY, { expiresIn: '7ds' })
        });

    } catch (error) {
        next(error);
    }
}