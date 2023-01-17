const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
        },
    createThought(req, res) {
        Thought.create(req.body)
                .then((thought) => 
                res.json(thought))
                .catch((err) => 
                res.status(500).json(err))
    },
    
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thought })
        .select('-__v')
        .lean()
        console.log('route hit')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => 
            res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
}