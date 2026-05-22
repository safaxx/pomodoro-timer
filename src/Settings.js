import BackButton from "./BackButton";

function Settings({ focusMinutes, breakMinutes, onFocusChange, onBreakChange, onBack }) {
  return (
    <div className="settings">
      <BackButton onClick={onBack} className="settings-back" />
      <h2 style={{color: "white"}}>Time (minutes)</h2>

      <div className="settings-box">
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
    </div>
  );
}

export default Settings;
