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
    
    getSingleThought({req}, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        // .lean()
        console.log('route hit')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought))
        .catch((err) => res.status(500).json(err));
    //     .then((thought) => {
    //         if (!thought) {
    //             res.status(404).json({message: "Thought not found with this ID"});
    //             return;
    //         }
    //         res.json(thought)
    //     })
    //     .catch((err) => { 
    //     console.log(err);
    //     res.status(400).json(err)
    // });
    }, 

    createThought(req, res) {
        Thought.create(req.body)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { thoughts: _id } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID!'})
                    : res.json(user)
                    )
                    .catch((err) => res.status(500).json(err));
    //         .then((thought) => 
    //         res.json(thought))
    //         .catch((err) => res.status(500).json(err));
    // },
},
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
                    )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
               : User.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true}
               ) )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'Thought deleted, but no user found'})
                : res.json({ message: 'Thought deleted'})
                )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })            
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { thoughts: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID!'})
                    : res.json(thought)
                    )
                    .catch((err) => res.status(500).json(err));
    }
}