import React from 'react';
import { Link } from 'react-router-dom'
import { ImageLink } from './NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default class Header extends React.Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{"position": "sticky","top": 0}}>
        <ImageLink className="navbar-brand" to="/" src={require("../assets/leo.png")} width="50" height="50" alt="Home" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="/mission" value="Our Mission" id="mission" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our Mission</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="mission">
                <Link className="dropdown-item" to="/mission">Mission</Link>
                <Link className="dropdown-item" to="/mission/diabetes">Diabetes</Link>
                <Link className="dropdown-item" to="/mission/vision">Vision</Link>
                <Link className="dropdown-item" to="/mission/hunger">Hunger</Link>
                <Link className="dropdown-item" to="/mission/environment">Environment</Link>
                <Link className="dropdown-item" to="/mission/childhood-cancer">Childhood Cancer</Link>

              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="/projects" value="Projects" id="mission" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="mission">
                <Link className="dropdown-item" to="/projects">Projects</Link>
                <a className="dropdown-item" href="https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun">Leo 5k Run</a>
                <a className="dropdown-item" href="https://charity.gofundme.com/">COVID-19 Relief</a>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/board">Board</Link>
            </li>
             <li className="nav-item">
              <Link to="/dashboard" >
                  <FontAwesomeIcon icon={faUser} size="lg" style={{height:"100%",margin:"0 .5rem"}}/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      )
  }
}

