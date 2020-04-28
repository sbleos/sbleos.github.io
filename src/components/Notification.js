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
    const { id, title, message, type, borderColor } = this.props.notification;

    let b = "";
    if(type === "success")
      b = "border-success";
    else if(type === "error")
      b = "border-danger";
    else if(type === "warning")
      b = "border-warning";
    else if(type === "info")
      b = "border-info";

    const delay = this.props.notification.delay || 5000;

    return(
      <div className={`toast m-1 ${b}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay={delay} style={{borderColor: borderColor}}>
        <div className="toast-header">
          {title && <strong className="mr-auto">{title}</strong>}
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.props.removeNotification(id)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {message && <div className="toast-body">{message}</div>}
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
