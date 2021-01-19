const User = require('../models/user');
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
        const user = await User.findById(id).select(['-password', '-__v']).sort({ createdAt: 1 }).exec();
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
        user.password = password;
        user.email = email;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}
exports.delete = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await User.remove({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
exports.patch = async function (req, res, next) {
    try {
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await User.updateMany({ _id: id }, { $set: updateOps });
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}