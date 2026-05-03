import { useEffect, useState } from "react";
import API from "../api";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Tasks 🚀</h2>

      {/* INPUT */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* LIST */}
      {tasks.length === 0 ? (
        <p className="empty">✨ No tasks yet — add your first task!</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <span className="task-title-text">{task.title}</span>

              <span className={`badge ${task.status}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}