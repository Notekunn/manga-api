const Artist = require('../models/Artist');
const utils = require('../utils');

exports.getAll = async function (req, res, next) {
    try {
        const artists = await Artist.find({}).select(['-__v']).sort({ name: 1 }).exec();
        res.status(200).send({
            data: artists
        })
    } catch (error) {
        next(error);
    }
}

exports.create = async function (req, res, next) {
    try {
        const { name, about, avatarUrl } = req.body;
        const slug = await utils.generateSlug(Artist, req.body.name, null);
        const artist = new Artist({
            name,
            slug,
            about,
            avatarUrl
        });
        await artist.save();
        res.status(200).send(artist);
    }
    catch (error) {
        next(error);
    }
}
exports.get = async function (req, res, next) {
    try {
        const artist = await Artist.findById(req.params.id).select(['-__v']).sort({ name: 1 }).exec();
        if (!artist) {
            throw new Error('Không tìm thấy tác giả');
        }
        res.status(200).send(artist)
    } catch (error) {
        next(error);
    }
}
exports.delete = async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await Artist.remove({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}