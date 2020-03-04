import React from 'react';
import NavItem, {Brand} from './NavItem';
import Button from './Button';

const navStyle = {
  backgroundColor: "#F8F8F8",
  height: 70
}

const divStyle = {
  height: 40,
  position: "relative",
  left: 30,
  top: 12,
  display: "block",
  width:"95%"
}

const navItemStyle = {
  height: 40,
  position: "absolute",
  display: "inline-block",
  verticalAlign:"middle",
  top: 12,
  right: 0
}


export default class Header extends React.Component {
  // <nav style={navStyle}>
  //   <div style={divStyle}>
  //     <Brand to="/" src={require("../assets/leo.png")} width="40" height="40"/>
  //     <div style={navItemStyle}>
  //       <NavItem to="/" value="Home"/>
  //       <NavItem to="/about" value="About"/>
  //       <NavItem to="/mission" value="Our Mission"/>
  //       <NavItem to="/projects" value="Projects"/>
  //       <NavItem to="/board" value="Board"/>
  //       <Brand to="/dashboard" src={require("../assets/user.svg")} width="20" height="20"/>
  //     </div>
      
  //   </div>
  // </nav>
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{"position": "sticky","top": 0}}> 
        <Brand className="navbar-brand" to="/" src={require("../assets/leo.png")} width="50" height="50"/>
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
              <a className="nav-link dropdown-toggle" to="/mission" value="Our Mission" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our Mission</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <NavItem className="dropdown-item" to="/mission                   " value="Mission" />
                <NavItem className="dropdown-item" to="/mission/diabetes          " value="Diabetes" />
                <NavItem className="dropdown-item" to="/mission/vision            " value="Vision" />
                <NavItem className="dropdown-item" to="/mission/hunger            " value="Hunger" />
                <NavItem className="dropdown-item" to="/mission/environment       " value="Environment" />
                <NavItem className="dropdown-item" to="/mission/childhood-cancer  " value="Childhood Cancer" />

              </div>
            </li>
            <li className="nav-item">
              <NavItem className="nav-link" to="/projects" value="Projects" />
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

