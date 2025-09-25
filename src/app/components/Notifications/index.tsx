'use-client'
import List from "./List"
import React from 'react';
import Filter from "./Filter";
import socket from "@/app/lib/socket";
export type NotificationType = {
    title: string,
    description:string,
    timestamp:string,
    id:string,
    readStatus:string
}
export type NotificationReducerState = {
    notifications : NotificationType[],
    readStatus: string,
    groupByDate:boolean
}
const initialState:NotificationReducerState = {
    notifications : [],
    readStatus: '',
    groupByDate: false,
}
export type NotificationAction = {
    type: 'ADD_NOTIFICATION',
    payload: NotificationType | NotificationType[]
}  | {
    type: 'MARK_READ',
    payload: string
} | {
    type:'GROUP_BY_DATE',
    payload: boolean
}

const notificationReducer = (state:NotificationReducerState,action:NotificationAction)=>{
    switch(action.type){
        case 'ADD_NOTIFICATION':{
            if(Array.isArray(action.payload)){
                return {...state,notifications:[...state.notifications,...action.payload]};
            }
            return {...state,notifications:[...state.notifications,action.payload]};
        }
        case 'MARK_READ':
            return {...state,notifications: state.notifications.map((n)=>({...n,readStatus:'read'}))}
        case 'GROUP_BY_DATE':
            return {...state,groupByDate:true};
        default:
            return state;
    }
}
const Notification = ()=>{
    const [state,dispatch] = React.useReducer(notificationReducer,initialState)
    const notificationRef = React.useRef<NotificationType[]>([])
    React.useEffect(()=>{
        socket.on("notification-send",(data:NotificationType)=>{
            console.log(data,"data")
            notificationRef.current.push(data);
            if(notificationRef.current.length===5){
                dispatch({type:"ADD_NOTIFICATION",payload:notificationRef.current})
                notificationRef.current=[]
            }
        })
        return ()=>{
            socket.off("notification-send");
        }
    },[])
    return <div>
        <Filter state={state} dispatch={dispatch}/>
        <List notifications={state.notifications} dispatch={dispatch} />
    </div>
}
export default Notification;
