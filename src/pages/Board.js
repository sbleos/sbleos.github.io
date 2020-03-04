import React from 'react';
import BoardMember, {ExecutiveMember} from '../components/BoardMember';
import NavItem from '../components/NavItem';


function Board() {
  return (
    <>
      <nav aria-label="breadcrumb" className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item active" aria-current="page">Board</li>
        </ol>
      </nav>

      <div style={{textAlign:"center"}} className="container-fluid">
        <div className="row align-items-center justify-content-md-center">
          <BoardMember position="President" name="Sarang Mohaniraj"      /*width="90" height="90"*/    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
          <BoardMember position="Vice President" name="Ronit Thummuluru" width="90" height="90" src={require("../assets/ronit.jpeg")} alt="Ronit Thummuluru"   text="My name is Ronit Thummaluru, and I’m the Vice President of the South Brunswick Leo Club. This is my third year being a Leo and I’ve been involved with several projects including helping organize the Leo 5k as well as volunteering at many other events. Outside of the club, one of my favorite hobbies is to travel. Being a senior in high school, I’m a three varsity sport athlete as well as a member of the Asian cultural club. The South Brunswick Leo Club has led me to discover new things about our local community and has taught me the importance of giving back to others."/>
        </div>
        <div className="row align-items-center justify-content-md-center">
          <BoardMember position="Secretary" name="Ronaq Sahni"           /*width="90" height="90"*/  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
          <BoardMember position="Treasurer" name="Richard Jerry"         /*width="90" height="90"*/    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
        </div>
        <div className="row align-items-center justify-content-md-center">
          <ExecutiveMember name="Archana Ramkumar"                       width="90" height="90" src={require("../assets/archana.jpeg")} alt="Archana Ramkumar"   text="My name is Archana Ramkumar and I am one of the three Leo Directors this year. This is my third year in Leo Club and my second year having a big role in the Leo 5K planning process. Some events I’ve volunteered with include Special Olympics and the Indian Health Camp of New Jersey. In school, I run cross country and varsity indoor and spring track. I also work at Dayton Park Pharmacy as a pharmacy clerk. Through being a part of the South Brunswick Leo Club, I have been able to gain invaluable leadership experiences while meeting other aspiring Leos in the process. I hope to finish my last year in this club with some great memories!"/>
    	    <ExecutiveMember name="Madison Bush"                           /*width="90" height="90"*/     text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
    	    <ExecutiveMember name="Adiv Kuray"                             /*width="90" height="90"*/   text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
        </div>
      </div>
    </>
  );
}

export default Board;
