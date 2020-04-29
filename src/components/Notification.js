import React from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../store/actions/notificationActions';

class Notification extends React.Component{

  componentDidMount() {
    window.$('.toast').toast('show');
    const delay = this.props.notification.delay || 5000;
    setTimeout(() => this.props.removeNotification(this.props.notification.id),delay+500);
  }
  render(){
    //borderColor is not necessary if including a type (warning, error, success, info)
    const { id, title, message, type, borderColor, error } = this.props.notification;
    let t = title || undefined,
        m = message || undefined,
        ty = type || "",
        b = borderColor || "",
        delay = this.props.notification.delay || 5000;

    if(error) { //just pass error if you want a default error notification *BE CAREFUL! THIS WILL OVERRIDE TITLE, MESSAGE, AND TYPE*
      t = `Error code: ${error.code}`;
      m = error.message;
      ty = "error";
    }


    if(ty === "success")
      b = "border-success";
    else if(ty === "error")
      b = "border-danger";
    else if(ty === "warning")
      b = "border-warning";
    else if(ty === "info")
      b = "border-info";


    return(
      <div className={`toast m-1 ${b}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay={delay} style={{borderColor: borderColor}}>
        <div className="toast-header">
          {t && <strong className="mr-auto">{t}</strong>}
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.props.removeNotification(id)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {m && <div className="toast-body">{m}</div>}
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    removeNotification: (id) => dispatch(removeNotification(id))
  }
}

export default connect(null,mapDispatchToProps)(Notification);
