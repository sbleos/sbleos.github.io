import React from 'react';


const BoardMember = props => (
	<div className="col-6 col-md-4" style={{width:350,textAlign: "center",display: "inline-block", marginLeft: 100, marginRight: 100, marginTop: 80, marginBottom: 80}}>
    <img src={props.src} width={props.width} height={props.height} alt={props.alt} style={{borderRadius: "50%"}}></img>
  	<h3 style={{color:"gray"}}>{props.position}<span style={{color:"black"}}> {props.name}</span></h3>
  	<p>{props.text}</p>
	</div>
)

export const ExecutiveMember = props => (
	<div className="col" style={{width:350,textAlign: "center",display: "inline-block", marginLeft: 40, marginRight: 40, marginTop: 80, marginBottom: 80}}>
    <img src={props.src} width={props.width} height={props.height} alt={props.alt} style={{borderRadius: "50%"}}></img>
  	<h3 style={{color:"gray"}}>Executive Member<span style={{color:"black"}}> {props.name}</span></h3>
  	<p>{props.text}</p>
	</div>
)

export default BoardMember;

