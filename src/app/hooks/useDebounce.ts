import React from 'react';

type DebounceProps = {
    fn:()=>void,
    delay: number
}

const useDebounce = ({ fn, delay }:DebounceProps)=>{
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);   
    React.useEffect(()=>{
        return ()=>{
            if(timerRef.current){
                clearTimeout(timerRef.current);
            }
        }
    },[]) 
    return ()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        const timerId = setTimeout(()=>{
            fn()
        },delay)
        timerRef.current=timerId
    }
}
export default useDebounce;