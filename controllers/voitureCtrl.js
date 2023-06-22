const Voiture = require("../models/Voiture")
const mongoose = require("mongoose")

module.exports = {
    create: async (req, res, next) => {
        const doc = req.body.voiture

        let objectID = mongoose.Types.ObjectId().toString();
        const voiture = {
            ...doc,
            _id: objectID,
            createdAt: Date.now(),
        }

        await Voiture.findOneAndUpdate({_id: voiture._id}, JSON.parse(JSON.stringify(voiture)), {upsert: true, new: true})
        .then(() => res.status(201).json({ message: 'voiture créé avec succès!' }))
        .catch(error => res.status(400).json({ error })) 
    },

    update: async (req, res, next) => {
        const doc = { ...req.body.voiture };
        
        await Voiture.updateOne({_id: req.params.id}, JSON.parse(JSON.stringify(doc)))
        .then(() => res.status(201).json({ message: 'voiture modifié avec succès!'}))
        .catch(error => res.status(400).json({ error })) 
    },

    getAll: async (req, res, next) => {
        await Voiture.find()
        .then(voiture => res.status(200).json({ voiture }))
        .catch(error => res.status(400).json({ error }))
    },

    getOne: async (req, res, next) => {
        await Voiture.findOne({ _id: req.params.id })
        .then(voiture => res.status(200).json({ voiture }))
        .catch(error => res.status(500).json({ error }))
    },

    getByName: async (req, res, next) => {
        await Voiture.findOne({ name: req.params.name })
        .then(voiture => res.status(200).json({ voiture }))
        .catch(error => res.status(500).json({ error }))
    },

    delete: async (req, res, next) => {

        await Voiture.findOneAndDelete({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'voiture supprimé !'}))
          .catch(error => res.status(400).json({ error }))
    }
}