import "./StatusCard.css";

/**
 * Reusable pipeline-status widget.
 * stages: [{ label: string, status: "done" | "progress" }]
 */
export default function StatusCard({ title = "Deployment Status", stages }) {
  return (
    <div className="status-card">
      <div className="status-card-header">
        <h3>{title}</h3>
        <span className="status-icon">☁</span>
      </div>
      {stages.map((stage) => (
        <div className="status-row" key={stage.label}>
          <span>{stage.label}</span>
          {stage.status === "done" ? (
            <span className="status-badge done">✔</span>
          ) : (
            <span className="status-badge progress">In Progress…</span>
          )}
        </div>
      ))}
    </div>
  );
}
