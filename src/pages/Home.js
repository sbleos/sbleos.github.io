import React from 'react';
import Section from '../components/Section';

const title = {
	backgroundColor: "#f0f4f7",
	color: "#F9C910",
	// height: "37.5rem",
	// textAlign: "center",
	// fontSize: "5.2rem",
  fontWeight: 300,
  // display:" inline-block",
  // width: "100%",
  lineHeight: 1.2
}

function Home() {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid" style={title}>
      	<h1 style={{margin: "4rem"}} className="display-1">Together We Serve</h1>
      </div>
        <div className="container">
          <Section pos="left" h="Lorem ipsum dolor sit amet" p="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
          <Section pos="right" h="Lorem ipsum dolor sit amet" p="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
      </div>
    </div>
  );
}

export default Home;
