import React from 'react';
import { connect } from 'react-redux';
import { getActiveMembership } from '../../../store/actions/userActions';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryBrushContainer,
  createContainer,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip
} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom","voronoi");

/**
 * Displays the number of active memberships at a given time
 * It is useful to visualize the growth of the club
 */
class MembershipChart extends React.Component {
   constructor(props) {
    super(props)
    this.state = {};
    this.props.getActiveMembership();
  }

  handleZoom = (domain) => this.setState({selectedDomain: domain});
  handleBrush = (domain) => this.setState({zoomDomain: domain});

  render() {
    const activeMembership = this.props.activeMembership || [];
    const currentNumMembers = activeMembership.length > 0 ? activeMembership[activeMembership.length - 1].y : ""
    const title = activeMembership.length > 0 ? `Active Membership (${currentNumMembers})` : "Active Membership";

    const dateTimeFormatter = new Intl.DateTimeFormat('en-US');

    const widthMain = 600, heightMain = 350,
          widthMini = widthMain, heightMini = heightMain * 0.4,
          centerX = widthMain/2;

    const color = "#28a037"; // matplotlib tab:green

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
              labels={({ datum }) => `${dateTimeFormatter.format(new Date(datum.x))}: ${datum.y}`}
              voronoiBlacklist={["scatterActiveMembership"]}
              style={{data: {  fill: "white" }}}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <VictoryLabel text={title} x={centerX} y={30} textAnchor="middle"/>
          <VictoryAxis
            tickFormat={(x) => dateTimeFormatter.format(new Date(x))}
            style={{
              tickLabels: { angle: 45, fontSize: 10 },
              ticks: { padding: 10 }
            }}
          />
          <VictoryAxis dependentAxis tickFormat={t => +t}/>
          <VictoryLine
            style={{
              data: { stroke: color },
              labels: { fill: color }
            }}
            interpolation="monotoneX"
            data={activeMembership}
          />
          <VictoryScatter
            name="scatterActiveMembership"
            style={{
              data: { fill: color }
            }}
            data={activeMembership}
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
            tickFormat={(x) => dateTimeFormatter.format(new Date(x))}
            style={{
              tickLabels: { angle: 45, fontSize: 8 },
              ticks: { padding: 10 }
            }}
          />
          <VictoryLine
            style={{
              data: {stroke: color}
            }}
            interpolation="monotoneX"
            data={activeMembership}
          />
          <VictoryScatter
            style={{
              data: {fill: color}
            }}
            data={activeMembership}
          />
        </VictoryChart>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeMembership: state.user.activeMembership
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveMembership: () => dispatch(getActiveMembership())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipChart);
