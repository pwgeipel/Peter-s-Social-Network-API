const moment = require('moment')
const { Schema, model, Types } = require('mongoose')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        }
    },{
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => moment(createdAtDate).format('MMM Do YYYY, h:mm:ss a')
        }
    },{
        username: {
            type: String,
            required: true,
        }
    },{
        toJSON: {
            virtuals: true,
            getters: true
          },
          id: false,
    }
)    

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtDate) => moment(createdAtDate).format('MMM Do YYYY, h:mm:ss a')
        }
    },{
        toJSON: {
            virtuals: true,
            getters: true
          },
          id: false,
    }
);

const Thought = model('Thought', thoughtSchema);
thoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
})

module.exports = Thought;