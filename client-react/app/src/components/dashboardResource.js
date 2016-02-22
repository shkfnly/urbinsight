import React from 'react';
import c3 from 'c3';

// To Be Replaced with Actual Function Data
let exampleData = {
    bindto: '#sample-chart-',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
    },
}
//Load classes based on the Data model using classNames
class DashboardResourcePane extends React.Component {
  componentDidMount(){
    exampleData.size = {width: (screen.width/4)};
    exampleData.bindto = "#sample-chart-" + this.props.resource;
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What?
    c3.generate(exampleData);
  }
  render(){
    const mountId = "sample-chart-" +this.props.resource
    return(
      <div>
        <div className="dashboard-pane">
          <div className="resource-chart-container"id={mountId}>
            {/*I'm A Graphic based on water consumption and availability*/}
          </div>
          <div id="kpi-indicators">
            <h2>KPI Indicators</h2>
            <div>
              <h3>Adaptability Performance:</h3>
              <h4>Water usage satisfied on site</h4>
              <div id="kpi-indicators-adaptability-chart">
                I'm a Graphic
              </div>
            </div>
            <div>KB
              <h3>Adaptability Performance:</h3>
              <h4>Demand exceeding Capacity</h4>
              <div id="kpi-indicators-capacity-chart">
                I'm a Graphic
              </div>
            </div>
          </div>
        </div>
        <div id="archetype-library">
          <h3>Urban Archetype Library</h3>
          <h4>Browse Different Resources</h4>
          <select id="archetype-selection">
            <option>Hello</option>
            <option>World</option>
          </select>

          <div id="archetype-holder">
            <div id="archetype-image-holder"><img id="archetype-image" src="./House-In-Monasterios_1.jpg"></img></div>
            <div id="archetype-text-holder">
              <h5><strong>Type:</strong> Two Story Detached</h5>
              <h5><strong>Zoning:</strong> Residential</h5>
              <h5><strong>Age:</strong> pre-1970s</h5>
              <h5><strong>Water Use:</strong>lots of rambling
              lots of ramblinglots of ramblinglots of ramblinglots of rambling
            lots of ramblinglots of ramblinglots of ramblinglots of rambling
          lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
        lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
      lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
    lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
  lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
            </h5>
            </div>
          </div>
        </div>
        <div id="archetype-action-buttons">
          <div id="archetype-action-button"> Contribute </div> <div id="archetype-action-button"> Share </div> <div id="archetype-action-button">Print</div>
        </div>
      </div>
    )
  }
}

export default DashboardResourcePane
