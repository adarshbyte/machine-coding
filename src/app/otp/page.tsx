"use client";
import React from "react";
import styles from "./otp.module.css";
const Otp = () => {
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const [currentFocus, setCurrentFocus] = React.useState<number>(1);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "valeu");
    let value = e.target.value
     value = value.replace(/[^0-9]/g, "");  

    if (value.length > 1) {
      value = value.slice(-1);
    }
    setNumbers((prev) => {
      const newList = [...prev];
      newList[e.target.key] = value;
      return newList;
    });
  };
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, "key");
    if (
      e.target.key?.toLowerCase().includes("backspace") &&
      e.target.value === ""
    ) {
      setCurrentFocus((prev) => prev - 1);
    } else if (e.target.key?.toLowerCase().includes("tab")) {
      setCurrentFocus((prev) => prev + 1);
    }
  };
  const handleFocus = (e) => {
    setCurrentFocus(e.target.id);
    
  };
  React.useEffect(() => {
    // if (refs.current) {
    //   refs.current[currentFocus]!.focus();
    // }
  }, []);
  return (
    <div className={styles.container}>
      <input
        type="text"
        onKeyDown={handleKeyDown}

        maxLength={1}
        id={"1"}
        onChange={handleChange}
        value={numbers[1]}
        inputMode="numeric"     // 👈 keyboard numeric hi khulega
      />
      <input
        type="text"
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        maxLength={1}
        id="2"
        onChange={handleChange}
        inputMode="numeric" 
      />
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        maxLength={1}
        id="3"
        onChange={handleChange}
        inputMode="numeric" 
      />
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        maxLength={1}
        id="4"
        onChange={handleChange}
        inputMode="numeric" 
      />
    </div>
  );
};
export default Otp;
