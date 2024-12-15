import mongoose from "mongoose";
import Todos from "../models/todos.models.js";

// add todo
const addTodo = (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json({
      message: "todo is required",
    });
    return;
  }
  Todos.create({
    todo
  });
  res.status(201).json({
    message: "user added to database successfully",
  });
};

// get all todo
const allTodos = async (req, res) => {
  try {

    const todos = await Todos.find({});
    if (!todos) {
      res.status(404).json({
        message: "no todo found"
      })
      return
    }
    res.status(200).json({
      todos
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

// get single todo
const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: "ID is not MongoDB ID",
      })
      return;
    }
    const singleTodo = await Todos.findById(id);
    if (!singleTodo) {
      res.status(404).json({
        message: "Todo not found"
      })
      return;
    }
    res.status(200).json({
      todo: singleTodo
    })
  } catch {
    res.status(400).json({
      message: error
    })
  }
}




// edit todo
const updateTodoById = async (req, res) => {
  // update todo
  const { id } = req.params;
  const { todo } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "ID is not MongoDB ID"
    })
    return;
  }
  if (!todo) {
    res.status(400).json({
      message: "todo is required"
    })
    return;
  }

  const updateTodo = await Todos.findByIdAndUpdate(
    id,
    {
      todo,
    },
    {
      new: true, runValidators: true
    }
  )
  if (!updateTodo) {
    res.status(404).json({
      message: "NO TODO FOUND"
    });
    return;
  }
  res.status(200).json({
    message: "todo updated successfully",
    updateTodo
  })
}


// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "ID is not a mongoDb ID"
    })
    return
  }
  try {
    // same way to delete with findOneAndDelete({_id : id})
    const todo = await Todos.findByIdAndDelete(id)
    res.status(200).json({
      message: "Todo Deleted Successsfully",
      todo,
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }

}





export { addTodo, allTodos, getSingleTodo, updateTodoById, deleteTodo };