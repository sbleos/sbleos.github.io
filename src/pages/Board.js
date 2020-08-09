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


const board = require("../assets/board/board.json");
const clubYears = Object.keys(board).sort();
const clubYearsReversed = [...clubYears].reverse();
const LATEST_YEAR = clubYears[clubYears.length - 1];

class Board extends React.Component{
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    const { location } = this.props;
    const search = location.search;
    const query = new URLSearchParams(search);
    const year = query.get("year");

    return (
      <React.Fragment>

        {
          clubYears.includes(year) ? // so it only works for the years which there are records
          <BoardDescription year={year} board={board[year]} /> :
          <BoardDescription board={board[LATEST_YEAR]} />
        }

        <div className="container">
          <div className="mt-2 mb-5 d-inline-block">
            <h4>See the board from the previous years!</h4>
            <ul className="list-group list-group-flush">
              {clubYearsReversed.map(year =>
                <li className="list-group-item" key={year}>
                  <Link to={`/board?year=${year}`}>{year}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>

      </React.Fragment>
  )}
}

const BoardDescription = ( { year, board }) => {

  const { president, vicePresident, secretary, treasurer, executiveMembers } = board;

  let breadcrumb, helmet, title = "Meet our Board";
  if(year && year !== LATEST_YEAR){
    breadcrumb = <Breadcrumb directory={{path:`/board?year=${year}`,name:["Board",year]}} />;
    title = `Meet our ${year} Board`;
    helmet = (
      <Helmet>
        <title>{year} Board</title>
        <meta name="description" content="These are the leaders of the club. They work together to enhance the meaning of service and project it on the rest of the club." />
        <meta name="keywords" content="" />
      </Helmet>
    )
  }
  else {
    breadcrumb = <Breadcrumb directory={{"path":"/board","name":"Board"}} />;
    helmet = (
      <Helmet>
        <title>Board</title>
        <meta name="description" content="These are the leaders of the club. They work together to enhance the meaning of service and project it on the rest of the club." />
        <meta name="keywords" content="" />
      </Helmet>
    )
    year = LATEST_YEAR;
  }

  return(
    <div>
      {helmet}
      {breadcrumb}
      <div className="container">
        <div style={{textAlign:"center"}} className="mt-5">
          <h1 className="display-3 text-center pt-5 pb-5">{title}</h1>
          <div className="row mt-3 mb-3 justify-content-around">
            {president && <BoardMember position="President" name={president.name} width="90" height="90" src={require(`../assets/board/${year}/${president.relativeImageURL}`)} alt={president.name} description={president.description} />}
            {vicePresident && <BoardMember position="Vice President" name={vicePresident.name} width="90" height="90" src={require(`../assets/board/${year}/${vicePresident.relativeImageURL}`)} alt={vicePresident.name} description={vicePresident.description} />}
          </div>
          <div className="row mt-3 mb-3 justify-content-around">
            {secretary && <BoardMember position="Secretary" name={secretary.name} width="90" height="90" src={require(`../assets/board/${year}/${secretary.relativeImageURL}`)} alt={secretary.name} description={secretary.description} />}
            {treasurer && <BoardMember position="Treasurer" name={treasurer.name} width="90" height="90" src={require(`../assets/board/${year}/${treasurer.relativeImageURL}`)} alt={treasurer.name} description={treasurer.description} />}
          </div>
          {executiveMembers && <div className="row mt-3 mb-3 justify-content-around">
            {executiveMembers.map((member, idx) => (
              <BoardMember key={idx} executive name={member.name} width="90" height="90" src={require(`../assets/board/${year}/${member.relativeImageURL}`)} alt={member.name} description={member.description} />
            ))}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Board);
