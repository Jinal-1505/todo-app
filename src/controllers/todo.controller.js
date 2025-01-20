import Todo from '../models/todo.model.js';
import User from '../models/user.model.js';

/**
 * Create To-Do
 * @param {*} req
 * @param {*} res
 */
export const createTodo = async (req, res) => {
    try {
        // Add user ID from authenticated user to the To-do
        await Todo.create({ ...req.body, userId: req.user?._id });

        res.status(201).json({ message: 'Todo created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Get To-Do by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
            .populate({ path: 'userId', select: 'firstName lastName email', model: User }) // Populate user details
            .lean();

        if (!todo) {
            res.status(404).json({ message: 'Todo detail not found' }); // Respond if To-do is not found
            return;
        }

        res.status(200).json({ message: 'Todo details fetched successfully', data: todo });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Get To-Do of authenticated User
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user?._id })
            .populate({ path: 'userId', select: 'firstName lastName email', model: User }) // Populate user details
            .lean();

        // Respond if no Todos are found
        if (todos.length === 0) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        res.status(200).json({ message: 'Todos detail fetched successfully', data: todos });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Update TO-DO By ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne({ _id: req.params.id }, req.body, { new: true });

        // Respond if the To-do is not found
        if (!updatedTodo.acknowledged) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        res.status(200).json({ message: 'Todos detail updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Delete To-Do By ID
 * @param {*} req
 * @param {*} res
 */
export const deleteTodo = async (req, res) => {
    try {
        // Find and delete the To-do item by ID
        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
