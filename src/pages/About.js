import React from 'react';
import Section from '../components/Section';
import NavItem from '../components/NavItem';




function About() {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item active" aria-current="page">About Us</li>
        </ol>
      </nav>

	    <Section pos="left" h="About Leos" p="The Leo Club stands for Leadership, Experience, and Opportunity. The members of this club come together and perform social service acts. This club is the youth sector of the Lions International Club and is dedicated to encouraging younger people to help their community."/>
      <Section pos="right" h="History" p="It was first founded in 1957 by Jim Graver, who was a member of the Lions Club. Eventually, in 1964 it became an official sponsored program of the Lions Club, and was able to grow into the program that it is now. Today, there are over 7,200 Leo clubs worldwide, with over 130,000 members. Together, the Leos have been able to accomplish around 20,000 projects worldwide."/>
      <Section pos="left" h="Our Club" p="The purpose of the Leo club is to give back to the community. Our chapter does this by having many fundraising events like 5Ks, eyeglass recycling centers, volunteering for health fairs and more. We also want to create new young leaders and foster their talents. We want to unite the members of the Leo Club in friendship and allow them opportunities to contribute to both the local and international communities."/>
    </div>
  );
}

export default About;
