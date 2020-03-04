import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

const style = {
	display: "inline-block",
	fontWeight: 400,
	color: "white",
	textAlign: "center",
	verticalAlign: "middle",
	userSelect: "none",
	backgroundColor: "#00338D",
	border: "1px solid transparent",
	padding: "6px 12px",
	fontSize: "16px",
	lineHeight: "1.5",
	borderRadius: "4px",
	textDecoration: "none",
	transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out"
}

const Button = props => (
	<div>
		<Link to={props.href} style={style}>{props.value}</Link>
	</div>
)

export default Button;

