import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis, // may need to format dates
  VictoryBrushContainer,
  createContainer,
  VictoryTheme,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip
} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom","voronoi");

/**
 * Based off of demo https://formidable.com/open-source/victory/guides/brush-and-zoom
 * Cannot combine into one graph using createContainer to join zoom and brush
 * because overlapping drag and click functionality does not work together
 */
class AttendanceChart extends React.Component {
   constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom = (domain) => this.setState({selectedDomain: domain});
  handleBrush = (domain) => this.setState({zoomDomain: domain});

  render() {
    let { events } = this.props;
    let eventData = [], attendanceData = [], dates = [];
    const dateTimeFormatter = new Intl.DateTimeFormat('en-US');

    if(events) {
      events = events.map(year => year.events).flat().sort((a, b) => new Date(a.date) - new Date(b.date));
      dates = [...new Set(events.map(event => new Date(event.date)))]

      let meetings = events.filter(event => event.type === "Meeting");
      events = events.filter(event => event.type !== "Meeting");

      eventData = events.map(event => {
        let attendees = event.attendees ? Object.keys(event.attendees).length : 0;
        return {x: new Date(event.date), y: attendees || 0, title: event.title};
      });


      attendanceData = meetings.map(event => {
        let attendees = event.attendees ? Object.keys(event.attendees).length : 0;
        return {x: new Date(event.date), y: attendees || 0, title: event.title};
      });


    }

    const widthMain = 600, heightMain = 350,
          widthMini = widthMain, heightMini = heightMain * 0.4,
          centerX = widthMain/2;

    const eventColor = "#1b77b2", attendanceColor = "#ff7f1e"; // default matplotlib pyplot colors (tab:orange and tab:blue)
    return(
      <React.Fragment>
        <VictoryChart
          width={widthMain}
          height={heightMain}
          style={{ parent: { height: "auto", width: "auto" } }}
          scale={{x: "time"}}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 }
          }}
          theme={VictoryTheme.material}
          padding={{ top: 50, bottom: 50, left: 50, right: 70 }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
              labels={({ datum }) => `${datum.title}\n${dateTimeFormatter.format(new Date(datum.x))}: ${datum.y}`}
              voronoiBlacklist={["scatterEvents","scatterAttendance"]}
              style={{data: {  fill: "white" }}}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <VictoryLabel text="Attendance of Events and Meetings" x={centerX} y={30} textAnchor="middle"/>
          <VictoryLegend
              style={{ border: { stroke: "black" }, labels: { fontSize: 10 } }}
              data={[
                { name: "Attendance", symbol: { fill: attendanceColor } },
                { name: "Events", symbol: { fill: eventColor } }
              ]}
              x={widthMain-100} y={5}
            />
          <VictoryAxis
            tickValues={dates}
            tickFormat={(x) => dateTimeFormatter.format(new Date(x))}
            style={{
              tickLabels: { angle: 45, fontSize: 10 },
              ticks: { padding: 10 }
            }}
          />
          <VictoryAxis dependentAxis />
          <VictoryLine
            style={{
              data: { stroke: eventColor },
              labels: { fill: eventColor }
            }}
            interpolation="monotoneX"
            data={eventData}
          />
          <VictoryScatter
            name="scatterEvents"
            style={{
              data: { fill: eventColor }
            }}
            data={eventData}
          />
          <VictoryLine
            style={{
              data: { stroke: attendanceColor },
              labels: { fill: attendanceColor }
            }}
            interpolation="monotoneX"
            data={attendanceData}
          />
          <VictoryScatter
            name="scatterAttendance"
            style={{
              data: {fill: attendanceColor}
            }}
            data={attendanceData}
          />
        </VictoryChart>

        <VictoryChart
          width={widthMini}
          height={heightMini}
          style={{ parent: { height: "auto", width: "auto" } }}
          scale={{x: "time"}}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 }
          }}
          theme={VictoryTheme.material}
          padding={{ top: 10, bottom: 50, left: 50, right: 70 }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush}
            />
          }
        >
          <VictoryAxis
            tickValues={dates}
            tickFormat={(x) => dateTimeFormatter.format(new Date(x))}
            style={{
              tickLabels: { angle: 45, fontSize: 8 },
              ticks: { padding: 10 }
            }}
          />
          <VictoryLine
            style={{
              data: {stroke: eventColor}
            }}
            interpolation="monotoneX"
            data={eventData}
          />
          <VictoryScatter
            style={{
              data: {fill: eventColor}
            }}
            data={eventData}
          />
          <VictoryLine
            style={{
              data: {stroke: attendanceColor}
            }}
            interpolation="monotoneX"
            data={attendanceData}
          />
          <VictoryScatter
            style={{
              data: {fill: attendanceColor}
            }}
            data={attendanceData}
          />
        </VictoryChart>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    events: state.firestore.ordered.events
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['events'])
)(AttendanceChart);
