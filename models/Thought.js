const { Schema, model, Types } = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
    },{
    reactions: [reactionSchema],
    },
);    



const Thought = model('Thought', thoughtSchema);
thoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
})

module.exports = Thought;