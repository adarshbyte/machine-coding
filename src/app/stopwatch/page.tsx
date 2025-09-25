"use client";
import React from "react";

const Page = () => {
  const [time, setTime] = React.useState<number[]>([0, 1, 0, 1, 6, 0]);
  const [currentFocus, setCurrentFocus] = React.useState<number>(0);
  const elementRefs = React.useRef<HTMLInputElement[]>([]);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 1) || '';
    const position = parseInt(e.target.id);
    // validate the value before pushing
    setTime((prev) => {
      const newTime = [...prev];
      newTime[position] = parseInt(value.slice(0, 1)) || '';
      return newTime;
    });
  };
  const handleClickStartStop = () => {
    setIsStarted((prev) => {
      return !prev;
    });
  };
  const handleKeyDown = (e:React.KeyboardEvent)=>{
    if(e.key.toLowerCase().includes('backspace')){
        setCurrentFocus(prev=>{
            if(prev>0){
                return prev-1;
            }
            return prev;
        })
    }
  }
  React.useEffect(() => {
    if (elementRefs.current) {
      elementRefs.current[0].focus();
    }
    if (!isStarted) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => {
        let hours = parseInt(prev[0] + "" + prev[1]);
        let minutes = parseInt(prev[2] + "" + prev[3]);
        let seconds = parseInt(prev[4] + "" + prev[5]);
        let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
        totalSeconds -= 1;
        if (totalSeconds < 0) {
          totalSeconds = 0;
        }
        hours = totalSeconds / (60 * 60);
        minutes = (totalSeconds % (60 * 60)) / 60;
        seconds = totalSeconds % 60;
        setTime([
          ...hours
            .toString()
            .split("")
            .map((x) => parseInt(x)),
          ...minutes
            .toString()
            .split("")
            .map((x) => parseInt(x)),
          ...seconds
            .toString()
            .split("")
            .map((x) => parseInt(x)),
        ]);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isStarted]);
  React.useEffect(()=>{
    if(elementRefs.current){
        elementRefs.current[currentFocus]?.focus();
    }
  },[currentFocus])
  return (
    <div>
      <ul style={ulElement}>
        {time.map((param, i) => {
          return (
            <li key={i} style={liElement}>
              <input
                type="text"
                value={param}
                id={String(i)}
                onChange={handleChange}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={(el) => {
                  if(elementRefs.current){
                    elementRefs.current[i] = el;
                  }
                }}
              />
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={handleClickStartStop}>
        {isStarted ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Page;

const liElement: React.CSSProperties = {
  width: "40px",
};
const ulElement: React.CSSProperties = {
  listStyle: "none",
  border: "2px solid",
  display: "flex",
};
