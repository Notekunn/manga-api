const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({ _id: decoded.id, email: decoded.email }).exec();
        next();
    } catch (error) {
        error.status = 401;
        error.message = 'Chưa đăng nhập';
        next(error);
    }
};