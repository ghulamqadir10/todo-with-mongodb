import { useEffect, useRef, useState } from "react";

import axios from "axios";
// import React from 'react';
// import ReactDOM from 'react-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedVal, setEditedVal] = useState(null);
  const todoRef = useRef();

  // getTodos
  const getTodos = () => {
    axios.get(`http://localhost:3000/api/v1/todos`)
      .then((res) => {
        console.log(res.data.todos);
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useeffect
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoRef.current.value) {
      return alert("please add todo");
    }
    axios
      .post(`http://localhost:3000/api/v1/addTodo`, {
        todo: todoRef.current.vallue,
      })
      .then((res) => {
        console.log(res)
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    todoRef.current.value = "";
  };

  // editTodo
  const editTodo = (id) => {
    if (!editedVal) {
      return alert("please add edited value");
    }
    axios
      .put(`http://localhost:3000/api/v1/updateTodo/${id}`, {
        todo: editedVal,
      })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    setEdit(false);
  };

  // delete
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/deleteTodo/${id}`)
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="container" className="flex flex-col items-center mt-8 border-8 w-1/2 m-auto p-2.5 gap-1.5">
      <h1>
        <i>
          <strong>Todo App</strong>{" "}
        </i>
      </h1>
      <form onSubmit={addTodo}>
        <div className="input-group mb-3">
          <input
            ref={todoRef}
            type="text"
            className="form-control"
            placeholder="Add todo"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              // ya bhi chalasakta hain age submit nachala to m,
              // onClick={addTodo}
              type="submit"
              className="btn btn-outline-primary"
            >
              <i>Add todo</i>
            </button>
          </div>
        </div>
      </form>
{/* other possibility */}
<div className="mt-8 w-full max-w-xl">
          {todos.length > 0 ? (
            <div className="space-y-4">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
                >
                  {edit !== index ? (
                    <>
                      <h3 className="text-lg font-medium">{todo.todo}</h3>
                      <div className="flex gap-5">
                        <button
                          onClick={() => {
                            setEdit(index), setEditedVal(todo.todo);
                          }}
                          className="text-green-500 font-semibold hover:text-green-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="text-red-500 font-semibold hover:text-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center gap-4 items-center rounded-lg ">
                      <input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Enter your todo"
                        value={editedVal}
                        onChange={(e) => setEditedVal(e.target.value)}
                      />
                      <button
                        onClick={() => editTodo(todo._id)}
                        className="bg-blue-500 text-white px-2 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all"
                      >
                        Update Todo
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-center text-gray-500 text-lg mt-5">
              No Todo Found!
            </h2>
          )}
        </div>
      </div>
    // </>
  // );
        )}

export default App;
