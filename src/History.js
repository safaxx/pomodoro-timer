import React from "react";

function History({ items = [], onClose }) {
  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>Session History</h3>
        <button className="with-text" onClick={onClose}>Close</button>
      </div>
      {items.length === 0 ? (
        <div className="history-empty">No sessions yet</div>
      ) : (
        <ul className="history-list">
          {items.map((r) => (
            <li key={r.id} className="history-item">
              <div className="history-type">{r.type.toUpperCase()}</div>
              <div className="history-duration">{r.durationMinutes} min</div>
              <div className="history-ts">{new Date(r.endedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
