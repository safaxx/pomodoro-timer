import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

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
      ) : (
        <Timer
          focusMinutes={focusMinutes}
          breakMinutes={breakMinutes}
          onSettingsClick={() => setShowSettings(true)}
        />
      )}
    </main>
  );
}

export default App;
