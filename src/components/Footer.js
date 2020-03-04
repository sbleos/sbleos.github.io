import React from 'react';
import NavItem from './NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


const footer = {
  backgroundColor: "#00338D",
  textAlign: "center",
  padding: 30,
  // height: 60,
  height: "auto",
  color: "white",
  width: "100%",
  position: "relative",
  // bottom: 0
}

const Footer = () => (
 
  <footer>
    <div className="footer" id="footer" style={footer}>
        <div className="container" >
            <a href="https://www.instagram.com/sbleos/" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <a href="https://www.facebook.com/sbleos/" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon={faFacebook}  style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <a href="mailto:southbrunswickleoclub@gmail.com" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon={faEnvelope}  style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <p>© Copyright 2020 South Brunswick Leo Club</p>
        </div>
    </div>

                          
   
  </footer>

  );

export default Footer;
