import React from 'react';
import { Link } from 'react-router-dom'


const NavItem = props => (
	<Link to={props.to} style={props.style} className={props.className}>{props.value}</Link>
)

export const Brand = props => (
	<Link to={props.to}><img src={props.src} width={props.width} height={props.height} className={props.className} alt={props.alt}/></Link>
)

export const NavDashItem = props => (
  <Link to={props.to} style={props.linkStyle}>{props.value}<span style={{display:"block",margin: "1rem 0"}}></span></Link>
)

export default NavItem;

