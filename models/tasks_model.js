const mongoose = require("mongoose")
///

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true

    },
    taskDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    taskDescription: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('taskMan', taskSchema)