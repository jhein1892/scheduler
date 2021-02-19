import { useState } from 'react';

export function useVisualMode(initial)  {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(event, replace = false){
    // console.log("IN TRANSITION")
    if (replace) {
      // console.log("HISTORY TRANSITION 1", history)
      history.pop()
      setHistory(prev => ([...prev, mode]))
      setMode(event)
      // console.log("HISTORY 2", history)
    } else {
      setMode(event)
      setHistory(prev => ([...prev, mode]))
    }
  }
  
  function back(){
    // console.log("IN BACK", history)
    if (history.length > 1){
      history.pop()
      // console.log("PREV HISTORY", history)
      setMode(history[history.length-1])
      // console.log("HISTORY", history[history.length-1])
    } else { 
      setMode(history[0])
    }
  }
  // console.log("MODE", mode)
  // console.log("HISTORY", history)
  return { mode, transition, back };
};

