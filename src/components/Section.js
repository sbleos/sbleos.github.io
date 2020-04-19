import React from 'react';
/*
 * @deprecated
 * Use only with <div className="container">
 * So the text is not on the edge of the screen
 * Otherwise, uncomment the paddingLeft and change {margin: "4rem 0"} to {margin: "4rem"}
 * Personally, this style is outdated and should probably not be used
 * As of now, it only works for one paragraph per header
 */

const hStyle = {
  textAlign: "left",
  margin: "4rem 0",
  // paddingLeft: "4rem",
  fontSize: "3rem"
}

const pStyle = {
  textAlign: "right",
  paddingLeft: "20rem",
  margin: "4rem 0",
  fontSize: "1.4rem",
}

const hStyle2 = {
  textAlign: "right",
  margin: "4rem 0",
  fontSize: "3rem"
  // paddingLeft: "20rem"
}


const pStyle2 = {
  textAlign: "left",
  margin: "4rem 0",
  fontSize: "1.4rem",
  paddingRight: "20rem"
}

class Section extends React.Component{
  render(){
    const {pos,h,p} = this.props;

    if(pos === "right"){
      return(
        <div style={{position:"relative",margin:"8rem 0rem",width: "100%"}}>
          <h1 style={hStyle2}>{h}</h1>
          <p style={pStyle2}>{p}</p>
        </div>
      );
    }else{
      return(
        <div style={{position:"relative",margin:"8rem 0rem",width: "100%"}}>
          <h1 style={hStyle}>{h}</h1>
          <p style={pStyle}>{p}</p>
        </div>
      );
    }

  }
}

export default Section;
