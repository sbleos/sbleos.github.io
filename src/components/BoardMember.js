import React from 'react';


const BoardMember = props => (
	<div className={(!props.executive ? "col-lg-5"  : "col-lg-4") + " col-md-12 text-center"}>
    <img src={props.src} width={props.width} height={props.height} alt={props.alt} style={{borderRadius: "50%"}}></img>
  	<h3 style={{color:"gray"}}>{props.position || "Executive Member"}<span style={{color:"black"}}> {props.name}</span></h3>
  	<p>{props.text}</p>
	</div>
);

export default BoardMember;