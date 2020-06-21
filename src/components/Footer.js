import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (

  <footer>
    <div className="footer fixed-bottom p-4 text-center mt-auto position-absolute" id="footer" style={{backgroundColor: "#00338D",color: "white",height:"10"}}>
        <div className="container" >
            <a href="https://www.instagram.com/sbleos/" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon={["fab","instagram"]} style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <a href="https://www.facebook.com/sbleos/" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon={["fab","facebook"]} style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <a href="mailto:southbrunswickleoclub@gmail.com" >
              <button type="button" className="btn btn-lg">
                <FontAwesomeIcon icon="envelope"  style={{ color: 'white' }} size="lg" />
              </button>
            </a>
            <p>© Copyright 2020 South Brunswick Leo Club</p>
        </div>
    </div>



  </footer>

);

export default Footer;
