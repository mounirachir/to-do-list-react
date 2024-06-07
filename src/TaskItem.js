// TaskItem.js
import React, { useState } from "react";

const TaskItem = ({ task, onDeleteTask, onToggleComplete, onEditTask }) => {
  const {
    id,
    name: initialName,
    description: initialDescription,
    completed,
  } = task;
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDeleteTask(id);
  };

  const handleToggleComplete = () => {
    onToggleComplete(id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onEditTask(id, name, description);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${completed ? "completed" : ""}`}>
      {!isEditing ? (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggleComplete}
          />
          <div>
            <h3>{initialName}</h3>
            <p>{initialDescription}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn" type="submit">
            Save
          </button>
          <button className="btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </li>
  );
};

export default TaskItem;
