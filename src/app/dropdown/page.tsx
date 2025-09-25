"use client";
import React from "react";

const Dropdown = () => {
  const [value, setValue] = React.useState("");
  const [dropdownTexts, setDropdownTexts] = React.useState([
    "a",
    "b",
    "c",
    "d",
  ]);
  const [isOpen,setIsOpen]=React.useState(false)
  const [currentFocus, setCurrentFocus] = React.useState<number>(0);
  const refs = React.useRef<HTMLInputElement[] | HTMLLIElement[]>([]);
  const dropdrownWrapper = React.useRef<HTMLUListElement | null>(null)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key.toLowerCase().includes("enter")) {
      setValue((e.target as HTMLElement).innerText);
    } else if (e.key.toLowerCase().includes("up")) {
      setCurrentFocus(prev=>{
        if(prev===0){
            return prev;
        }
        return prev-1
    });
    }else if(e.key.toLowerCase().includes("down")){
        setCurrentFocus(prev=>prev+1);
    }
  };
  React.useEffect(()=>{
    if(refs.current){
        refs.current[currentFocus].focus();
    }
  },[currentFocus])
  React.useEffect(()=>{
    const handleOutsideClick =(e:MouseEvent)=>{
        console.log("here",dropdrownWrapper.current,e.target,"shit" ,e.target!=refs.current[0],refs.current[0],e.target)
        if(dropdrownWrapper.current && refs.current[0] && !dropdrownWrapper.current.contains(e.target as Node) && e.target!=refs.current[0]){
            setIsOpen(false);
            console.log("inside")
        }
    }
    document.addEventListener('click',handleOutsideClick)
    return ()=>{
        document.removeEventListener('click',handleOutsideClick);
    }
  },[])
  return (
    <div>
      <input    
        ref={(el) => {
          if (el) {
            refs.current["0"] = el;
          }
        }}
        style={{padding:"5px"}}
        placeholder={value.length>0?value:"Nothing selected"}
        id={"0"}
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onFocus={(e)=>{
            setIsOpen(true)
        }}
        readOnly
      />
      {isOpen && <ul  role="listbox" ref={dropdrownWrapper}>
        {dropdownTexts.map((text, i) => {
          return (
            <li
              key={text}
              ref={(el) => {
                if (el) {
                  refs.current[i+1] = el;
                }
              }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              id={String(i+1)}
              style={{listStyle:'none',padding:"10px",marginBottom:"5px",border:"1px solid",width:"100px",cursor:"pointer"}}
            >
              {text}
            </li>
          );
        })}
      </ul>}
    </div>
  );
};
export default Dropdown;
