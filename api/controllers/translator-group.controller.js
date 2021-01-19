const mongoose = require('mongoose');
const TranslatorGroup = require('../models/TranslatorGroup')
const User = mongoose.model('User')
const utils = require('../utils')

exports.getAll = async function (req, res, next) {
    try {
        const translators = await TranslatorGroup.find({}).populate([{
            path: 'manager',
            select: ['-password', '-__v']
        }, {
            path: 'members',
            select: ['-password', '-__v']
        }]).sort({ name: 1 }).exec();
        res.status(200).send({
            data: translators
        });
    } catch (error) {
        next(error);
    }
}

exports.create = async function (req, res, next) {
    try {
        const { name, description, managerId } = req.body;
        const manager = await User.findById(managerId);
        if (!manager) throw new Error("Người dùng không tồn tại");
        if (!manager.isAuthority('moderator')) throw new Error("Bạn không đủ quyền tạo nhóm dịch");
        const slug = await utils.generateSlug(TranslatorGroup, name, null);
        const translatorGroup = new TranslatorGroup({
            name,
            slug,
            manager: manager._id,
            description,
        });
        await translatorGroup.save();
        res.send(translatorGroup);
    } catch (error) {
        next(error);
    }

}
exports.get = async function (req, res, next) {
    try {
        const translator = await TranslatorGroup.findById(req.params.id).populate([{
            path: 'manager',
            select: ['-password', '-__v']
        }, {
            path: 'members',
            select: ['-password', '-__v']
        }]).exec();
        res.status(200).send(translator);
    } catch (error) {
        next(error);
    }
}