import { useSelector } from "react-redux"
import "../index.css"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === null) {
    return null
  }
  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
