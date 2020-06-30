import React from 'react';
import Notification from './Notification';
import { connect } from 'react-redux';

class Notifications extends React.Component{
  render(){
    const { notifications, location } = this.props;
    let c = "", s = {} || "top-right"; //class, style, location
    if(location === "center")
      c = "d-flex justify-content-center align-items-center";
    else if(location === "top-right" || location === "topRight")
      s = {position: "absolute", top: 0, right: 0}
    else if(location === "top-left" || location === "topLeft")
      s = {position: "absolute", top: 0, left: 0}
    else if(location === "bottom-right" || location === "bottomRight")
      s = {position: "absolute", bottom: 0, right: 0}
    else if(location === "bottom-left" || location === "bottomLeft")
      s = {position: "absolute", bottom: 0, left: 0}

    return(
      <div style={{position:"absolute",height:"100vh",width:"100%",zIndex:300,pointerEvents: "none"}}>
        <div aria-live="polite" aria-atomic="true"  className={`${c}`} style={{position: "relative",pointerEvents: "auto"}}>
          <div style={s}>
            {notifications && notifications.map(notification => {
              return(<Notification notification={notification} key={notification.id} />)
            })}
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications
  }
}

export default connect(mapStateToProps)(Notifications);
