const Sauces = require('../models/sauces');
const fs = require('fs');

// Créer une sauce
exports.createSauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;

    const sauces = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauces.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

// Liker ou disliker une sauce
exports.likesAndDislikes = (req, res, next) => {

    if (req.body.like === 1) {
        console.log(req.body);
        Sauces.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: 'like +1 !' }))
            .catch(error => res.status(400).json({ error }))

    } else if (req.body.like === -1) {
        Sauces.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: (req.body.like++) * -1 },
                $push: { usersDisliked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: 'dislike +1 !' }))
            .catch(error => res.status(400).json({ error }))

    } else {
        Sauces.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauces.updateOne({ _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        })

                        .then(() => res.status(200).json({ message: 'like -1 !' }))
                        .catch(error => res.status(400).json({ error }))

                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauces.updateOne({ _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        })
                        .then(() => res.status(200).json({ message: 'Dislike -1 !' }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
}


// Modifier une sauce
exports.modifySauces = (req, res, next) => {
    if(req.file){
        // Si l'on modifie l'image 
        Sauces.findOne({ _id: req.params.id })
            .then(sauces => {
                // On supprime l'ancienne image
                const filename = sauces.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
            })
    }
    // Modifier la sauce
    const saucesObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};


// Supprimer une sauce
exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauces => {
            const filename = sauces.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                .catch(error => res.status(400).json({ error }));
            });
            })
            .catch(error => res.status(500).json({ error }));
};

// Récupérer une sauce
exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
};

// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};