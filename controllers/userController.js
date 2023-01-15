// const { createPoolCluster } = require('mysql2');
const { User, Thought } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => 
            res.json(user))
            .catch((err) => res.status(500).json(err));
    }
    // create: async function(req, res) {
    //     try {
    //         const result = await User.create(req.body)
    //         res.json(result)
    //     } catch(err) {
    //         res.status(500).json(err)
    //     }
    // },
    // find: async function (req, res) {
    //     try {
    //         const users = await 
    //     }
    // }
}