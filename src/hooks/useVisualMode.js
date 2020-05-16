import {useState} from 'react';

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a property mode

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode])
  const [mode, setMode] = useState(initialMode)

  const transition = (newMode, replace) => {
    if (replace) {
      setHistory(prev => ([...prev.slice(1)]))
      setMode(prevMode => newMode)
    } else {
      setMode(prevMode => newMode)
      setHistory(prev => [newMode,...prev])
    }
  }

  const back = () => {
    if (history.length === 1) {
      setMode(initialMode) 
    } else {
      setHistory(prev => ([...prev.slice(1)]))
      setMode(prevMode => history[1])
    }
  }

  // console.log(mode, history)
  return {mode, transition, back}
}

export default useVisualMode;