const express = require('express');
const tasks_model = require('../models/tasks_model');
const router = express.Router()

//getting all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await tasks_model.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
//getting one task
router.get('/:id', getTask, (req, res) => {
    // res.send(res.tasks.taskName)
    res.json(res.tasks)

})
//adding task
router.post('/', async (req, res) => {
    const tasks = new tasks_model({
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription

    })
    try {
        const newTask = await tasks.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})
//deleteing tasks
router.delete('/:id', getTask, async (req, res) => {
    try {
        const result = await res.tasks.deleteOne()
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found or already deleted" })
        }
        res.json({ message: "deleted task" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//updating task
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.taskName != null) {
        res.tasks.taskName = req.body.taskName;
    }

    if (req.body.taskDescription != null) {
        res.tasks.taskDescription = req.body.taskDescription;
    }

    try {
        const updatedTask = await res.tasks.save()
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//creating a function called a middleware
async function getTask(req, res, next) {
    let tasks
    try {
        tasks = await tasks_model.findById(req.params.id);
        if (tasks === null) {
            return res.status(404).json({ message: 'cannont find task' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
    res.tasks = tasks;
    next()
}

module.exports = router
