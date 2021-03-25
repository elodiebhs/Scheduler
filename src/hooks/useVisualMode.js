import { useState } from "react";

export default function useVisualMode(initial) {

  //need to keep track of the history of the modes, so we can go backwards

  const [history, setHistory] = useState([initial]);

  //const historyArray = useState(initial)
  //const history = historyArray[0]
  //const setHistory = hisotryArray[1]

  //--TRANSITION ex: SHOW TO EDIT 
  const transition = function (newMode, replace = false) {
    //We replace in the history. Instead of adding to the mode we replace the current mode
    if (replace) {
      //we need to take a new array, with everyting in the history, get everyting in the array, except the last one, and make a new mode
      //old history = [a,b,c], new mode = d
      //new history = [a,b,d]
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  ///----BACK ex : EXIT EDIT MODE take us back SHOW
  //the history can not be empty
  const back = () => {
    if (history.length < 2) {
      return;
    }
    //remove last element of the array
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  //we want the last history of the array
  const mode = history[history.length - 1];

  return { mode, transition, back };
}