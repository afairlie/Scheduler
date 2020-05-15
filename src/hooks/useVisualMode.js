import React, {useState} from 'react';

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a property mode

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode])
  const [mode, setMode] = useState(initialMode)

  const transition = (newMode, replace) => {
    if (replace) {
      setHistory(history.slice(1))
      setMode(newMode)
    } else {
      setMode(newMode)
      setHistory([mode, ...history])
    }
  }

  const back = () => {
    if (history.length === 1) {
      setMode(initialMode) 
    } else {
      setHistory(history.slice(1))
      setMode(history[0])
    }
  }

  return {mode, transition, back}
}

export default useVisualMode;