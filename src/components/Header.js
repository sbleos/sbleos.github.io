import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

class Header extends React.Component {
  render(){
    const { profile } = this.props;

    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{"position": "sticky","top": 0}}>
        <Link to="/"><img src={require("../assets/logos/leo_blue.png")} width="50" height="50" className="navbar-brand" alt="Home"/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mission">Our Mission</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="/projects" value="Projects" id="mission" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="mission">
                <NavLink className="dropdown-item" to="/projects">Projects</NavLink>
                <a className="dropdown-item" href="https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun">Leo 5k Run</a>
                <a className="dropdown-item" href="https://charity.gofundme.com/">COVID-19 Relief</a>
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board">Board</NavLink>
            </li>
             <li className="nav-item">

              <NavLink to={!profile.isEmpty ? "/dashboard" : "/login"} >
                  <FontAwesomeIcon icon={faUser} size="lg" style={{height:"100%",margin:"0 .5rem",color:"rgb(89,89,98)"}}/>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Header);