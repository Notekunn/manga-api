const TranslatorGroup = require('../models/TranslatorGroup')

exports.getAll = async function (req, res, next) {
    try {
        const translator = await TranslatorGroup.find({}).populate(['manager', 'members']).sort({ name: 1 }).exec();
        res.status(200).send({
            data: translator
        });
    } catch (error) {
        next(error);
    }
}

exports.create = async function (req, res, next) {
    try {
        const translatorGroup = new TranslatorGroup({
            name: "Cường và Linh",
            slug: "cuong-va-linh",
            manager: "6006aa7324fc473698fafd77",
            members: ['6006aa7224fc473698fafd76', '6006aa7424fc473698fafd78']
        });
        await translatorGroup.save();
        res.send(translatorGroup);
    } catch (error) {
        next(error);
    }

}