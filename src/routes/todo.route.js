import { Router } from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/todo.controller.js';
import { ValidateUser } from '../middleware/validate-user.js';

const todoRouter = Router();

export default todoRouter;

// TO-DO management Routes
todoRouter.route('/').post(ValidateUser, createTodo).get(ValidateUser, getTodos);
todoRouter.route('/:id').get(ValidateUser, getTodoById).put(ValidateUser, updateTodo).delete(ValidateUser, deleteTodo);

