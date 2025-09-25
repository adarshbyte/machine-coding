import { NotificationAction, NotificationType } from ".";
type Props = {
    notifications : NotificationType[],
    dispatch: React.Dispatch<NotificationAction>
}
const List = (props:Props) => {
  const { notifications , dispatch} = props;
  const handleReadStatus=(id:string)=>{
    dispatch({type:'MARK_READ',payload:id})
  }
  return <ul style={{}}>
    {notifications.map((notification: NotificationType) => {
      return (
        <li key={notification.id}>
          <input onChange={()=>handleReadStatus(notification.id)} type="checkbox" checked={notification.readStatus==='READ'?true:false}/>
          <h4>{notification.title}</h4>
          <p>{notification.description}</p>
        </li>
      );
    })}
  </ul>;
};
export default List;
