import React from 'react';
import BoardMember from '../components/BoardMember';
import { Breadcrumb } from '../components/Layout';


export default class Board extends React.Component{
  componentDidMount(){
    document.title = "Board | SB Leo Club";
  }

  render(){
    return (
      <>

        <Breadcrumb directory={[{"path":"/board","name":"Board"}]} />


        <div style={{textAlign:"center"}} className="container mt-5">
          <div className="row mt-3 mb-3 justify-content-around">
            <BoardMember position="President" name="Sarang Mohaniraj" width="90" height="90" src={require("../assets/board/ronit.jpeg")} alt="Ronit Thummuluru" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
            <BoardMember position="Vice President" name="Ronit Thummuluru" width="90" height="90" src={require("../assets/board/ronit.jpeg")} alt="Ronit Thummuluru"  text="My name is Ronit Thummaluru, and I’m the Vice President of the South Brunswick Leo Club. This is my third year being a Leo and I’ve been involved with several projects including helping organize the Leo 5k as well as volunteering at many other events. Outside of the club, one of my favorite hobbies is to travel. Being a senior in high school, I’m a three varsity sport athlete as well as a member of the Asian cultural club. The South Brunswick Leo Club has led me to discover new things about our local community and has taught me the importance of giving back to others."/>
          </div>
          <div className="row mt-3 mb-3 justify-content-around">
            <BoardMember position="Secretary" name="Ronaq Sahni" width="90" height="90" src={require("../assets/board/ronaq.jpg")} alt="Ronaq Sahni" text="My name is Ronaq Sahni, and I am the current secretary of the South Brunswick Leo Club. I was one of the founding members of the SB Leo Club in 2015. Back then, the club just had a handful of members. But over the years, I have personally seen it grow to over 60 members strong. I have volunteered at many events, including Special Olympics, National Night Out, the Lions Eyeglass Recycling Center, and more. This club has made me who I am today, teaching me the importance of service and good leadership."/>
            <BoardMember position="Treasurer" name="Richard Jerry" width="90" height="90" src={require("../assets/board/ronaq.jpg")} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
          </div>
          <div className="row mt-3 mb-3 justify-content-around">
            <BoardMember executive name="Archana Ramkumar" width="90" height="90" src={require("../assets/board/archana.jpeg")} alt="Archana Ramkumar" text="My name is Archana Ramkumar and I am one of the three Leo Directors this year. This is my third year in Leo Club and my second year having a big role in the Leo 5K planning process. Some events I’ve volunteered with include Special Olympics and the Indian Health Camp of New Jersey. In school, I run cross country and varsity indoor and spring track. I also work at Dayton Park Pharmacy as a pharmacy clerk. Through being a part of the South Brunswick Leo Club, I have been able to gain invaluable leadership experiences while meeting other aspiring Leos in the process. I hope to finish my last year in this club with some great memories!"/>      	    
            <BoardMember executive name="Madison Bush" width="90" height="90" src={require("../assets/board/madison.jpg")} alt="Madison Bush" text="My name is Madison Bush and I am currently acting executive board member of the South Brunswick Leo Club. I have been a member of the club since soon after it’s inception. I have participated in lots of events spanning over 5 years including health fairs, food drives, and park cleanups. I am excited to see me and my friends can do over the next year!"/>      	    
            <BoardMember executive name="Adiv Kuray" width="90" height="90" src={require("../assets/board/adiv.jpg")} alt="Adiv Kuray"  text="My name is Adiv Kuray, and I am a current Executive Member of the South Brunswick Leo Club. It is currently my 3rd year in the club, and I have worked on a significant number of projects and attended multiple events including the Leo 5k, LDUN, Special Olympics, etc. Beyond the Leo Club, I take part in a number of in school and out of school activities. In school, I am an active member of the Dead President Society History Club, Model United Nations club, and I am a tutor at my High School's Homework Help Center. Out of school I am a Junior NCO for the Raritan Valley Composite Squadron for the Civil Air Patrol. My hobbies include painting and history. The South Brunswick Leo club has taught me much regarding both my community, and the many problems faced around the globe. With this club, I hope to give to my community, and be a part in the solutions to these problems."/>
          </div>
        </div>
      </>
  )}
}
