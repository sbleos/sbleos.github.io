import React from 'react';


const BoardMember = ({ executive, position, src, width, height, alt, name, description }) => (
	<div className={(!executive ? "col-lg-5"  : "col-lg-4") + " col-md-12 text-center"}>
    <img src={src} width={width} height={height} alt={alt} style={{borderRadius: "50%"}}></img>
  	<h3 style={{color:"gray"}}>{position || "Executive Member"}<span style={{color:"black"}}> {name}</span></h3>
  	<p>{description}</p>
	</div>
);

export default BoardMember;