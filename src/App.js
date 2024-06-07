// App.js
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <div>
        <button className="btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn" onClick={() => setFilter("active")}>
          Active
        </button>
        <button className="btn" onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
        onEditTask={(taskId, name, description) => {
          setTasks(
            tasks.map((task) =>
              task.id === taskId ? { ...task, name, description } : task
            )
          );
        }}
      />
    </div>
  );
};

export default App;
