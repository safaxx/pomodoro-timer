import BackButton from "./BackButton";

function Settings({ focusMinutes, breakMinutes, onFocusChange, onBreakChange, onBack }) {
  return (
    <div className="settings">
      <BackButton onClick={onBack} />
      <h2>Time (minutes)</h2>
      <div className="settings-grid">
        <div className="settings-item">
          <label>Focus</label>
          <input
            type="number"
            min="1"
            value={focusMinutes}
            onChange={(e) => onFocusChange(Number(e.target.value))}
          />
        </div>
        <div className="settings-item">
          <label>Break</label>
          <input
            type="number"
            min="1"
            value={breakMinutes}
            onChange={(e) => onBreakChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
