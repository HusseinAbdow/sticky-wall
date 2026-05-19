const express = require('express');
const router = express.Router();

const { db } = require('../firebase');
const tasksCollection = db.collection('tasks');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ error: 'userId query parameter is required' });
        }

        const snapshot = await tasksCollection.where('userId', '==', userId.trim()).get();
        const tasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks', message: error.message });
    }
});

// POST create new task
router.post('/', async (req, res) => {
    try {
        const { title, userId } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
        }

        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ error: 'userId is required and must be a non-empty string' });
        }

        const taskData = {
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            userId: userId.trim()
        };

        const docRef = await tasksCollection.add(taskData);
        const newTask = {
            id: docRef.id,
            ...taskData
        };

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', message: error.message });
    }
});

// PUT update task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const taskRef = tasksCollection.doc(id);
        const docSnapshot = await taskRef.get();

        if (!docSnapshot.exists) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updates = {};

        if (title !== undefined) {
            if (typeof title !== 'string' || title.trim() === '') {
                return res.status(400).json({ error: 'Title must be a non-empty string' });
            }
            updates.title = title.trim();
        }

        if (completed !== undefined) {
            if (typeof completed !== 'boolean') {
                return res.status(400).json({ error: 'Completed must be a boolean' });
            }
            updates.completed = completed;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'At least one field (title or completed) is required for update' });
        }

        updates.updatedAt = new Date().toISOString();
        await taskRef.update(updates);

        const updatedSnapshot = await taskRef.get();
        const updatedTask = {
            id: updatedSnapshot.id,
            ...updatedSnapshot.data()
        };

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task', message: error.message });
    }
});

// DELETE task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskRef = tasksCollection.doc(id);
        const docSnapshot = await taskRef.get();

        if (!docSnapshot.exists) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await taskRef.delete();

        res.json({ message: 'Task deleted successfully', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', message: error.message });
    }
});

module.exports = router;
