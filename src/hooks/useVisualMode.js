import { useEffect, useState } from "react";


export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  const transition = (newMode, replace) => {
    //if replace is true remove the last state
    setMode(newMode)
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, -1), newMode]
      }
      return [...prev, newMode]
    })
    
    // if (replace) {
      // setHistory((prev) => [...prev.slice(0, -1), mode])
    // }
    // set history to previous history array and add the newMode
    // setHistory(prev => [...prev, mode])
    // return setMode(mode);
  }

  const back = () => {
    // if history is at the initial value do nothing
    if (history.length > 1) {
      // copying array
      let newHistory = [...history];
      // removing the last state
      newHistory.pop();
      // setting history to the poped history
      setHistory(newHistory);
      // setting mode to the last element in history
      return setMode(newHistory[newHistory.length - 1]);
    }
    
  }

  return {mode, transition, back};
}