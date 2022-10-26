const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("learning postgres");
});

app.post("/add-todo", async (req, res) => {
  const { description } = req.body;
  try {
    const addedTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1) RETURNING *",
      [description]
    );
    res.send(addedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/get-all-todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/get-todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.patch("/update-todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("todo updated successfully");
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/delete-todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json("todo deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));
