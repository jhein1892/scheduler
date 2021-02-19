import { useState } from 'react';

export function useVisualMode(initial)  {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(event, replace = false){   
    if (replace) {   
      setMode(event) 
    } else {
      setMode(event)
      setHistory(prev => ([...prev, mode]))
    }
  }

  function back(){   
    if (history.length > 1){
      history.pop()
      setMode(history[history.length-1])
    } else { 
      setMode(history[0])
    }
  }
  // console.log("MODE", mode)
  // console.log("HISTORY", history)
  return { mode, transition, back };
};

