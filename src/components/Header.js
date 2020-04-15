import React from 'react';
import NavItem, {Brand} from './NavItem';

export default class Header extends React.Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{"position": "sticky","top": 0}}> 
        <Brand className="navbar-brand" to="/" src={require("../assets/leo.png")} width="50" height="50" alt="Home" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavItem className="nav-link" to="/" value="Home" />
            </li>
            <li className="nav-item">
              <NavItem className="nav-link" to="/about" value="About" />
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="/mission" value="Our Mission" id="mission" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our Mission</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="mission">
                <NavItem className="dropdown-item" to="/mission" value="Mission" />
                <NavItem className="dropdown-item" to="/mission/diabetes" value="Diabetes" />
                <NavItem className="dropdown-item" to="/mission/vision" value="Vision" />
                <NavItem className="dropdown-item" to="/mission/hunger" value="Hunger" />
                <NavItem className="dropdown-item" to="/mission/environment" value="Environment" />
                <NavItem className="dropdown-item" to="/mission/childhood-cancer" value="Childhood Cancer" />

              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" to="/projects" value="Projects" id="mission" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="mission">
                <NavItem className="dropdown-item" to="/projects" value="Projects" />
                <a className="dropdown-item" href="https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun">Leo 5k Run</a>
              </div>
            </li>
            <li className="nav-item">
              <NavItem className="nav-link" to="/board" value="Board" />
            </li>
            {/*
            <li className="nav-item">
              <NavItem className="nav-link" to="/dashboard" value="Dashboard" />
            </li>*/}
          </ul>
        </div>
      </nav>
      )
  }
}

