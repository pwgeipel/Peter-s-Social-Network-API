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

    deleteUser(req, res) {
        User.findByIdAndRemove({ _id: req.params.userId })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user found with that ID'})
            : res.json({ message: "User deleted"}))
    .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate (
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            {runValidators: true, new: true })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user)) 
            .catch((err) => res.status(500).json(err))
               
    },

    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID'})
                : res.json(user))
        .catch((err) => res.status(500).json(err)); 
    }
 
};