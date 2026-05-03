import { useEffect, useState } from "react";
import API from "../api";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  const handleDelete = async (id) => {
  try {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Delete failed ❌");
  }
};

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects 📁</h2>

      {/* INPUT */}
      <div className="project-form">
        <input
          placeholder="Project name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* LIST */}
      {projects.length === 0 ? (
        <p className="empty">✨ No projects yet</p>
      ) : (
        <div className="project-list">
          {projects.map((p) => (
            <div key={p._id} className="project-card">
              <span className="project-name">{p.name}</span>

              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}