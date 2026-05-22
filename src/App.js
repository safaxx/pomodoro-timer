import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";
import History from "./History";
import { useEffect, useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [history, setHistory] = useState(() => {
    try {
      const today = new Date().toISOString().slice(0, 10); 
      const storedDate = localStorage.getItem("pomodoro.history.date");
      const raw = localStorage.getItem("pomodoro.history") || "[]";
      if (storedDate !== today) {
        localStorage.removeItem("pomodoro.history");
        localStorage.setItem("pomodoro.history.date", today);
        return [];
      }
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("pomodoro.history", JSON.stringify(history));
      localStorage.setItem("pomodoro.history.date", new Date().toISOString().slice(0, 10));
    } catch (e) {
      console.warn("Failed to persist history", e);
    }
  }, [history]);

  const addHistory = (record) => {
    setHistory((prev) => {
      const last = prev[0];
      if (last && last.type === record.type) {
        try {
          const t1 = new Date(last.endedAt).getTime();
          const t2 = new Date(record.endedAt).getTime(); //to check duplicate session
          if (Math.abs(t1 - t2) < 1000) {
            return prev; 
          }
        } catch (e) {
        }
      }
      return [record, ...prev].slice(0, 500);
    });
  };

  return (
    <main>
      {showSettings ? (
        <Settings
          focusMinutes={focusMinutes}
          breakMinutes={breakMinutes}
          onFocusChange={setFocusMinutes}
          onBreakChange={setBreakMinutes}
          onBack={() => setShowSettings(false)}
        />
      ) : showHistory ? (
        <History items={history} onClose={() => setShowHistory(false)} />
      ) : (
        <Timer
          focusMinutes={focusMinutes}
          breakMinutes={breakMinutes}
          onSettingsClick={() => setShowSettings(true)}
          onSessionComplete={addHistory}
          onShowHistory={() => setShowHistory(true)}
        />
      )}
    </main>
  );
}

export default App;
