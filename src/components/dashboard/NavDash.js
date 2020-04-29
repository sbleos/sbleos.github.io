import React from 'react';
import Overview from './Overview';
import Members from './Members';
import Hours from './Hours';
import Attendance from './Attendance';
import Events from './Events';
// import Points from './Points';
import Profile from './Profile';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faUserCircle, faUsers, faClipboardList, faCalendarAlt, faClock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class NavDash extends React.Component {
  render(){
    const { profile } = this.props;
    const hasAccess = true; //profile.role !== "Member" || profile.developer;
    return(
      <nav className="navbar navbar-dark bg-dark h-100 align-items-start">
        <ul className="navbar-nav ml-lg-3 ml-md-2 ml-sm-1" >
          { hasAccess &&
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Overview profile={profile} />)}} >
                <FontAwesomeIcon icon={faTachometerAlt}  />
                <span className="ml-md-1 ml-0 d-md-inline d-none">Overview</span>
              </NavLink>
            </li>
          }
          { hasAccess &&
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Members profile={profile} />)}} >
                <FontAwesomeIcon icon={faUsers} />
                <span className="ml-md-1 ml-0 d-md-inline d-none">Members</span>
              </NavLink>
            </li>
          }
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Hours profile={profile} />)}} >
              <FontAwesomeIcon icon={faClock} />
              <span className="ml-md-1 ml-0 d-md-inline d-none">Hours</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Attendance profile={profile} />)}} >
              <FontAwesomeIcon icon={faClipboardList} />
              <span className="ml-md-1 ml-0 d-md-inline d-none">Attendance</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Events profile={profile} />)}} >
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="ml-md-1 ml-0 d-md-inline d-none">Events</span>
            </NavLink>
          </li>
          <li style={{margin:"1rem 0",borderTop:"1px solid rgba(255,255,255,.5)"}}></li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Profile profile={profile} />)}} >
              <FontAwesomeIcon icon={faUserCircle} />
              <span className="ml-md-1 ml-0 d-md-inline d-none">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-danger" to="/dashboard" onClick={this.props.signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="ml-md-1 ml-0 d-md-inline d-none">Sign Out</span></NavLink>
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

export default connect(null,mapDispatchToProps)(NavDash);
