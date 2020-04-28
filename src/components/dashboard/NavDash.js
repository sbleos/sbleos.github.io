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

class NavDash extends React.Component {
  render(){
    return(
      <nav className="navbar navbar-dark bg-dark h-100 align-items-start">
        <ul className="navbar-nav ml-lg-3 ml-md-2 ml-sm-1" >
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Overview />)}} >Overview</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Members />)}} >Members</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Hours />)}} >Hours</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Attendance />)}} >Attendance</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Events />)}} >Events</NavLink>
          </li>
          <li style={{margin:"1rem 0",borderTop:"1px solid rgba(255,255,255,.5)"}}></li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard" onClick={(e)=>{this.props.changeView(<Profile />)}} >Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-danger" to="/dashboard" onClick={this.props.signOut}>Sign Out</NavLink>
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