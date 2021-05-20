import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace) => {
    //if replace is true remove the last state
    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      }
      return [...prev, newMode];
    });
  };

  const back = () => {
    // if history is at the initial value do nothing
    if (history.length > 1) {
      let newHistory = [...history];
      // removing the last state
      newHistory.pop();
      setHistory(newHistory);
      return setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
