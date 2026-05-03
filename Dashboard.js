import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        const tasks = res.data;

        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const pending = tasks.filter(t => t.status === "pending").length;

        setStats({
          total,
          completed,
          pending,
          overdue: 0,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard 👋</h2>

      {/* CARDS */}
      <div className="dashboard-cards">
        <div className="card blue">
          <div className="card-icon">📋</div>
          <p>Total Tasks</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="card green">
          <div className="card-icon">✅</div>
          <p>Completed</p>
          <h2>{stats.completed}</h2>
        </div>

        <div className="card orange">
          <div className="card-icon">📌</div>
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="card red">
          <div className="card-icon">⚠️</div>
          <p>Overdue</p>
          <h2>{stats.overdue}</h2>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="dashboard-bottom">
        <div className="recent">
          <h3>Recent Tasks</h3>
          <p>No tasks yet</p>
        </div>

        <div className="progress-box">
          <h3>Progress</h3>

          <div className="progress-item">
            <p>Completed</p>
            <div className="bar">
              <div
                className="fill green"
                style={{
                  width: `${stats.total ? (stats.completed / stats.total) * 100 : 5}%`
                }}
              />
            </div>
          </div>

          <div className="progress-item">
            <p>Pending</p>
            <div className="bar">
              <div
                className="fill orange"
                style={{
                  width: `${stats.total ? (stats.pending / stats.total) * 100 : 5}%`
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}