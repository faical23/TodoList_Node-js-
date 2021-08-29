const express = require('express')
const router = express.Router(); 
const Todo = require('../Controllers/TodoController');

router.get('/Todo',Todo.GetTodo)
router.get('/Todo/Task/:task',Todo.GetOneTodo)
router.post('/Todo',Todo.AddTodo)
router.put('/Todo',Todo.UpdateTodo)
router.delete('/Todo/:id',Todo.DeleteTodo)

module.exports = router; 