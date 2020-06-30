import React from 'react';
import BoardMember from '../components/BoardMember';
import { Breadcrumb } from '../components/Layout';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom'

/*
 * These must be square-cropped pictures because the images are formatted from a square to a circle
 * If the image is not cropped to be a perfect square and properly centered, the image will look stretched
 * Executive members should write less because they are 3 to one row and not 2 like the rest
 */

const BoardCurrent = () => {
  return(
    <div>
      <Helmet>
        <title>Board</title>
        <meta name="description" content="These are the leaders of the club. They work together to enhance the meaning of service and project it on the rest of the club." />
        <meta name="keywords" content="" />
      </Helmet>
      <div style={{textAlign:"center"}} className="mt-5">
        <h1 className="display-3 text-center pt-5 pb-5">Meet our Board</h1>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember position="President" name="Sarang Mohaniraj" width="90" height="90" src={require("../assets/board/sarang.jpeg")} alt="Sarang Mohaniraj" text="I have served with the club since the it was chartered in 2015. Until this year, middle schoolers were rare in the club, so my board and I took the initiative to grow our club. I founded and organized the annual Leo 5k Run as the Race Director in order to address our various global causes, and I am proud that it has been a success and expanded our club within the district. I also created this website for our Leos as well as anyone wishing to serve his or her community as a Leo! I have personally seen and experienced growth in each Leo and love volunteering together as a family."/>
          <BoardMember position="Vice President" name="Ronit Thummuluru" width="90" height="90" src={require("../assets/board/ronit.jpeg")} alt="Ronit Thummuluru"  text="My name is Ronit Thummaluru, and I’m the Vice President of the South Brunswick Leo Club. This is my third year being a Leo and I’ve been involved with several projects including helping organize the Leo 5k as well as volunteering at many other events. Outside of the club, one of my favorite hobbies is to travel. Being a senior in high school, I’m a three varsity sport athlete as well as a member of the Asian cultural club. The South Brunswick Leo Club has led me to discover new things about our local community and has taught me the importance of giving back to others."/>
        </div>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember position="Secretary" name="Ronaq Sahni" width="90" height="90" src={require("../assets/board/ronaq.jpg")} alt="Ronaq Sahni" text="My name is Ronaq Sahni, and I am the current secretary of the South Brunswick Leo Club. I was one of the founding members of the SB Leo Club in 2015. Back then, the club just had a handful of members. But over the years, I have personally seen it grow to over 60 members strong. I have volunteered at many events, including Special Olympics, National Night Out, the Lions Eyeglass Recycling Center, and more. This club has made me who I am today, teaching me the importance of service and good leadership."/>
          <BoardMember position="Treasurer" name="Richard Jerry" width="90" height="90" src={require("../assets/board/richard.jpeg")} alt="Richard Jerry" text="My name is Richard Jerry and I am currently the treasurer of the South Brunswick Leo Club. I was one of the charter members of the club back in 2015, and I am lucky to have been part of the Leo family for the past 5 years. I have volunteered at many events such as Special Olympics and National Night Out alongside my fellow Leos, and I am proud to have contributed to my community. Outside of the club, one of my favorites hobbies is to play the guitar. ln school, I run varsity cross country and track. By being part of the Leo Club, I have gained invaluable experiences that I hope to build upon in the future."/>
        </div>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember executive name="Archana Ramkumar" width="90" height="90" src={require("../assets/board/archana.jpeg")} alt="Archana Ramkumar" text="My name is Archana Ramkumar and I am one of the three Leo Directors this year. This is my third year in Leo Club and my second year having a big role in the Leo 5K planning process. Some events I’ve volunteered with include Special Olympics and the Indian Health Camp of New Jersey. In school, I run cross country and varsity indoor and spring track. I also work at Dayton Park Pharmacy as a pharmacy clerk. Through being a part of the South Brunswick Leo Club, I have been able to gain invaluable leadership experiences while meeting other aspiring Leos in the process. I hope to finish my last year in this club with some great memories!"/>
          <BoardMember executive name="Madison Bush" width="90" height="90" src={require("../assets/board/madison.jpg")} alt="Madison Bush" text="My name is Madison Bush and I am currently acting executive board member of the South Brunswick Leo Club. I have been a member of the club since soon after it’s inception. I have participated in lots of events spanning over 5 years including health fairs, food drives, and park cleanups. I am excited to see me and my friends can do over the next year!"/>
          <BoardMember executive name="Adiv Kuray" width="90" height="90" src={require("../assets/board/adiv.jpg")} alt="Adiv Kuray"  text="My name is Adiv Kuray, and I am a current Executive Member of the South Brunswick Leo Club. It is currently my 3rd year in the club, and I have worked on a significant number of projects and attended multiple events including the Leo 5k, LDUN, Special Olympics, etc. Beyond the Leo Club, I take part in a number of in school and out of school activities. In school, I am an active member of the Dead President Society History Club, Model United Nations club, and I am a tutor at my High School's Homework Help Center. Out of school I am a Junior NCO for the Raritan Valley Composite Squadron for the Civil Air Patrol. My hobbies include painting and history. The South Brunswick Leo club has taught me much regarding both my community, and the many problems faced around the globe. With this club, I hope to give to my community, and be a part in the solutions to these problems."/>
        </div>
      </div>
    </div>
  )
}

class Board extends React.Component{
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  renderYear(year){
    switch(year){
      case "2019-2020": return <Board20192020 year={year} />;
      case "2020-2021": return <Board20192020 year={year} />;
      default: return <BoardCurrent />;
    }
  }

  render(){
    const search = this.props.location.search;
    const query = new URLSearchParams(search);
    const year = query.get("year");

    return (
      <div className="container">
        <Breadcrumb directory={[{"path":"/board","name":"Board"}]} />

        {this.renderYear(year)}


        <div className="mt-2 mb-5 d-inline-block">
          <h4>See the board from the previous years!</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/board?year=2020-2021">2020-2021</Link>
            </li>
            <li className="list-group-item">
              <Link to="/board?year=2019-2020">2019-2020</Link>
            </li>
          </ul>
        </div>

      </div>
  )}
}

const Board20192020 = ({year}) => {
  return(
    <div>
      <Helmet>
        <title>{year} Board</title>
        <meta name="description" content="These are the previous board members who built the club." />
        <meta name="keywords" content="" />
      </Helmet>
      <div style={{textAlign:"center"}} className="mt-5">
        <h1 className="display-3 text-center pt-5 pb-5">Meet our {year} Board</h1>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember position="President" name="Sarang Mohaniraj" width="90" height="90" src={require("../assets/board/sarang.jpeg")} alt="Sarang Mohaniraj" text="I have served with the club since the it was chartered in 2015. Until this year, middle schoolers were rare in the club, so my board and I took the initiative to grow our club. I founded and organized the annual Leo 5k Run as the Race Director in order to address our various global causes, and I am proud that it has been a success and expanded our club within the district. I also created this website for our Leos as well as anyone wishing to serve his or her community as a Leo! I have personally seen and experienced growth in each Leo and love volunteering together as a family."/>
          <BoardMember position="Vice President" name="Ronit Thummuluru" width="90" height="90" src={require("../assets/board/ronit.jpeg")} alt="Ronit Thummuluru"  text="My name is Ronit Thummaluru, and I’m the Vice President of the South Brunswick Leo Club. This is my third year being a Leo and I’ve been involved with several projects including helping organize the Leo 5k as well as volunteering at many other events. Outside of the club, one of my favorite hobbies is to travel. Being a senior in high school, I’m a three varsity sport athlete as well as a member of the Asian cultural club. The South Brunswick Leo Club has led me to discover new things about our local community and has taught me the importance of giving back to others."/>
        </div>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember position="Secretary" name="Ronaq Sahni" width="90" height="90" src={require("../assets/board/ronaq.jpg")} alt="Ronaq Sahni" text="My name is Ronaq Sahni, and I am the current secretary of the South Brunswick Leo Club. I was one of the founding members of the SB Leo Club in 2015. Back then, the club just had a handful of members. But over the years, I have personally seen it grow to over 60 members strong. I have volunteered at many events, including Special Olympics, National Night Out, the Lions Eyeglass Recycling Center, and more. This club has made me who I am today, teaching me the importance of service and good leadership."/>
          <BoardMember position="Treasurer" name="Richard Jerry" width="90" height="90" src={require("../assets/board/richard.jpeg")} alt="Richard Jerry" text="My name is Richard Jerry and I am currently the treasurer of the South Brunswick Leo Club. I was one of the charter members of the club back in 2015, and I am lucky to have been part of the Leo family for the past 5 years. I have volunteered at many events such as Special Olympics and National Night Out alongside my fellow Leos, and I am proud to have contributed to my community. Outside of the club, one of my favorites hobbies is to play the guitar. ln school, I run varsity cross country and track. By being part of the Leo Club, I have gained invaluable experiences that I hope to build upon in the future."/>
        </div>
        <div className="row mt-3 mb-3 justify-content-around">
          <BoardMember executive name="Archana Ramkumar" width="90" height="90" src={require("../assets/board/archana.jpeg")} alt="Archana Ramkumar" text="My name is Archana Ramkumar and I am one of the three Leo Directors this year. This is my third year in Leo Club and my second year having a big role in the Leo 5K planning process. Some events I’ve volunteered with include Special Olympics and the Indian Health Camp of New Jersey. In school, I run cross country and varsity indoor and spring track. I also work at Dayton Park Pharmacy as a pharmacy clerk. Through being a part of the South Brunswick Leo Club, I have been able to gain invaluable leadership experiences while meeting other aspiring Leos in the process. I hope to finish my last year in this club with some great memories!"/>
          <BoardMember executive name="Madison Bush" width="90" height="90" src={require("../assets/board/madison.jpg")} alt="Madison Bush" text="My name is Madison Bush and I am currently acting executive board member of the South Brunswick Leo Club. I have been a member of the club since soon after it’s inception. I have participated in lots of events spanning over 5 years including health fairs, food drives, and park cleanups. I am excited to see me and my friends can do over the next year!"/>
          <BoardMember executive name="Adiv Kuray" width="90" height="90" src={require("../assets/board/adiv.jpg")} alt="Adiv Kuray"  text="My name is Adiv Kuray, and I am a current Executive Member of the South Brunswick Leo Club. It is currently my 3rd year in the club, and I have worked on a significant number of projects and attended multiple events including the Leo 5k, LDUN, Special Olympics, etc. Beyond the Leo Club, I take part in a number of in school and out of school activities. In school, I am an active member of the Dead President Society History Club, Model United Nations club, and I am a tutor at my High School's Homework Help Center. Out of school I am a Junior NCO for the Raritan Valley Composite Squadron for the Civil Air Patrol. My hobbies include painting and history. The South Brunswick Leo club has taught me much regarding both my community, and the many problems faced around the globe. With this club, I hope to give to my community, and be a part in the solutions to these problems."/>
        </div>
      </div>
    </div>
  )
}


export default withRouter(Board);
