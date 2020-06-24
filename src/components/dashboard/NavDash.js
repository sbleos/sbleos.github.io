import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'

class NavDash extends React.Component {
  render(){
    const { profile, match } = this.props;
    const { url } = match; // === "dashboard", but since it is a nested, dynamic route, if the name of the declared route in App.js changes, it should still work

    const hasAccess = profile.position !== "Member" || profile.developer == "true";
    return(
      <nav className="navbar navbar-dark bg-dark h-100 align-items-start">
        <ul className="navbar-nav ml-lg-3 ml-md-2 ml-sm-1" >
          { hasAccess &&
            <li className="nav-item">
              <NavLink exact className="nav-link" to={url}>
                <FontAwesomeIcon icon="tachometer-alt"  />
                &nbsp;&nbsp;
                <span className="d-md-inline d-none">Overview</span>
              </NavLink>
            </li>
          }
          { hasAccess &&
            <li className="nav-item">
              <NavLink className="nav-link" to={`${url}/members`}>
                <FontAwesomeIcon icon="users" />
                &nbsp;&nbsp;
                <span className="d-md-inline d-none">Members</span>
              </NavLink>
            </li>
          }
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/hours`}>
              <FontAwesomeIcon icon="clock" />
              &nbsp;&nbsp;
              <span className="d-md-inline d-none">Hours</span>
            </NavLink>
          </li>
          { hasAccess &&
            <li className="nav-item">
              <NavLink className="nav-link" to={`${url}/meetings`}>
                <FontAwesomeIcon icon="clipboard-list" />
                &nbsp;&nbsp;
                <span className="d-md-inline d-none">Meetings</span>
              </NavLink>
            </li>
          }
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/events`}>
              <FontAwesomeIcon icon="calendar-alt" />
              &nbsp;&nbsp;
              <span className="d-md-inline d-none">Events</span>
            </NavLink>
          </li>
          <li style={{margin:"1rem 0",borderTop:"1px solid rgba(255,255,255,.5)"}}></li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/profile`}>
              <FontAwesomeIcon icon="user-circle" />
              &nbsp;&nbsp;
              <span className="d-md-inline d-none">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-danger" to="/login" onClick={this.props.signOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
              &nbsp;&nbsp;
              <span className="d-md-inline d-none">Sign Out</span></NavLink>
          </li>
        </ul>
      </nav>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(NavDash));
