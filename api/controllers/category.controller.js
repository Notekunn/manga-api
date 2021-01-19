const Category = require('../models/Category');
const utils = require('../utils');

exports.getAll = async function (req, res, next) {
    try {
        const categories = await Category.find({}).sort({ title: 1 }).exec();
        res.status(200).send({
            data: categories
        })
    } catch (error) {
        next(error);
    }
}
exports.create = async function (req, res, next) {
    try {
        const { title, description } = req.body;
        const slug = await utils.generateSlug(Category, title, null);
        const category = new Category({
            title,
            slug,
            description
        });
        await category.save();
        res.status(200).send(category);
    }
    catch (error) {
        next(error);
    }
}
exports.get = async function (req, res, next) {
    try {
        const category = await Category.findById(req.params.id).exec();
        if (!category) {
            throw new Error('Không tìm thấy thể loại');
        }
        res.status(200).send(category)
    } catch (error) {
        next(error);
    }
}
exports.getBySlug = async function (req, res, next) {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).exec();
        if (!category) {
            throw new Error('Không tìm thấy thể loại');
        }
        res.status(200).send(category)
    } catch (error) {
        next(error);
    }
}
exports.delete = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await Category.remove({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}