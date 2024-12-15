import express from "express";
import { addTodo, allTodos, getSingleTodo, deleteTodo, updateTodoById } from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/todos", allTodos);
router.get("/todo/:id", getSingleTodo);
router.post("/addTodo", addTodo);
router.put("/updateTodo/:id", updateTodoById);
router.delete("/deleteTodo/:id", deleteTodo);

export default router;