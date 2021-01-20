const Chapter = require('../models/Chapter');

exports.getAll = async function (req, res, next) {
    try {
        const chapters = await Chapter.find({})
            .populate([
                {
                    path: 'manga', select: '_id name slug description'
                },
                {
                    path: 'group', select: '_id name slug description'
                },
                {
                    path: 'translator', select: '_id name userName email permission'
                }])
            .select('-__v')
            .sort({ lastUpdated: -1 }).exec();
        res.send({
            data: chapters
        })
    } catch (error) {
        next(error);
    }
}

exports.create = async function (req, res, next) {
    try {
        const { chapter: chapterName, name, mangaId, groupId, translatorId, content } = req.body;
        const chapter = new Chapter({
            chapter: chapterName,
            name, manga: mangaId, group: groupId, translator: translatorId, content: content
        });
        await chapter.save();
        res.send(chapter);
    } catch (error) {
        next(error);
    }
}