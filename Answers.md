## 1. How to Run

### Prerequisites

Install the following on a fresh machine:

* Node.js (v18+ recommended)
* npm

### Run Locally

Clone the repository:

```bash
git clone https://github.com/safaxx/pomodoro-timer.git
cd pomodoro-timer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open in browser:

```txt
http://localhost:3000
```

### Production Build

```bash
npm run build
```

### Deployed URL

```txt
https://pomodoro-timer-dw.netlify.app/
```

## 2. Stack & Design Choice

I built the app with React because this task has a lot of small UI states: running, paused, focus mode, break mode, settings changes, completion messages, and daily history. It is easier to have these states using React hooks like useState, useEffect, and useRef.

I placed a circular timer in the center to show progress and countdown because it is the most important action on the screen. I wanted to make sure that a user should be able to glance at the app and immediately understand how much time is left without reading too much text.

Ffter a focus session ends, I added an audible cue and a short completion message before starting the break. I intentionally added this small delay(3 secs) to make the transition smooth.

## 3. Responsive & Accessibility

On a 360px-wide phone, the app stays as a single-column layout. The timer is the main focus, controls are kept close together, and the history/settings sections are still reachable without horizontal scrolling. On a 1440px laptop, the same single-screen layout stays centered but there is more breathing room around the timer.

I also kept strong visual contrast between the timer progress bar (red & green) and background so the user knows if the session is in progress or ended at a glance.

## AI Usage
Tool: GitHub Copilot Chat inside VS Code.

What I asked:

1. “Implement history persistence for completed Pomodoro sessions and make it survive reloads.”
2. “Does the current code reset history on a new calendar day? If not, how do I implement that?”
3. "How to add sound when the session ends?"

What it gave me:

1. For history persistence, it gave a localStorage read/write pattern in App.js.
2. For daily reset, it gave logic to compare saved history date to today and clear the history if the day changed.
3. Use Web Audio API

* The AI also suggested using the Web Audio API for the session sound effect, but I changed that to a simpler new Audio("/sounds/session-ended.mp3") approach and used an MP3 file instead.

## Honest gap

One area that isn’t fully polished yet is the user experience around alerts and feedback.

With another day I would:

add a pop-up overlay mode so the timer can float above other apps for better focus,
add sound effects to all controls so button presses feel more interactive,
make the session-complete transition more visually exciting with a stronger animation or celebration effect to boost motivation.