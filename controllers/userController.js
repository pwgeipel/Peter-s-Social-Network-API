const { User, Thought } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => 
            res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user))
                
        .catch((err) => res.status(500).json(err));
    },
 
};