const Manga = require('../models/Manga');
const utils = require('../utils');
exports.getAll = async function (req, res, next) {
    try {
        const mangas = await Manga.find({})
            .populate(['artists', 'groups', 'categories'])
            .sort({ lastUpdated: 1 }).exec();
        res.send({
            data: mangas
        })
    } catch (error) {
        next(error);
    }
}

exports.create = async function (req, res, next) {
    try {
        const { name, otherName, description, status, coverUrl, releasedYear, artists, categories, groups } = req.body;
        const slug = await utils.generateSlug(Manga, name, null);
        const manga = new Manga({
            name, slug, otherName, description,
            status, coverUrl, releasedYear, artists,
            categories, groups
        });
        await manga.save();
        res.send(manga)
    } catch (error) {
        next(error);
    }
}