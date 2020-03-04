import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'

const linkStyle = {
  marginRight: 15,
  color: "black",
  textDecoration: "none",
  fontSize: 20
};

const NavItem = props => (
	<Link to={props.to} /*style={linkStyle}*/ className={props.className}>{props.value}</Link>
)

export const Brand = props => (
	<Link to={props.to}><img src={props.src} width={props.width} height={props.height} className={props.className} /*style={{verticalAlign:"middle"}}*//></Link>
)

export const NavDashItem = props => (
  <Link to={props.to} style={props.linkStyle}>{props.value}<span style={{display:"block",margin: "1rem 0"}}></span></Link>
)

export default NavItem;

