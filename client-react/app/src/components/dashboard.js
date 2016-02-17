import React from 'react';
import classNames from 'classnames';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Tabs as muiTabs } from 'muicss/lib/react/tabs';
import { Tab as muiTab } from 'muicss/lib/react/tab';
import c3 from 'c3';

// To Be Replaced with Actual Function Data
let exampleData = {
    bindto: '#sample-chart',
    data: {
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]
    },
    size: {
      width: 500
    }
}
class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      opened: false
    };
    this.update = this.update.bind(this);
  }

  componentDidMount(){

  }

  update(e){
    // Set state calls render so necessary changes need to go before setState is called
    this.setState({opened: !this.state.opened})
  }
//onSelect={this.handleSelect}
  render(){
    let dashboardClass = classNames({'dashboard-opened': this.state.opened})
    let dashboardTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened,
    })
    let dashboardTabClass = classNames({
      'dashboard-tab-resources': true
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-opened-glyph': this.state.opened});


    c3.generate(exampleData);

    return(
      <div id="mapDashboard" className={dashboardClass}>
        <span id="dashboardToggle" className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle="tabs" defaultActiveKey={1} className={dashboardTabsClass}>
          <Tab className="dashboard-tab" eventKey={1} title='Resource Flows'>
            //Look Up how to change pills in bootstrap css
            <Tabs bsStyle="pills" defaultActiveKey={1} className={dashboardTabsClass}>
              <Tab className="dashboard-tab" eventKey={1} title='Energy' className={dashboardTabClass}>
                <div className="dashboard-pane">
                  <div id="sample-chart">
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
                    <div>
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
                  <div id="archetype-holder">
                    <div id="image-holder">I'll be an image</div>
                    <div id="text-holder">
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
              </Tab>
              <Tab className="dashboard-tab" eventKey={2} title='Water' className={dashboardTabClass}>Water content</Tab>
              <Tab className="dashboard-tab" eventKey={3} title='Materials' className={dashboardTabClass}>Materials content</Tab>
              <Tab className="dashboard-tab" eventKey={4} title='Food' className={dashboardTabClass}>Food content</Tab>
              <Tab className="dashboard-tab" eventKey={5} title='Mobility' className={dashboardTabClass}>Mobility content</Tab>
            </Tabs>
          </Tab>
          <Tab className="dashboard-tab" eventKey={2} title='Citizen Surveys'>Tab 2 content</Tab>
          <Tab className="dashboard-tab" eventKey={3} title='Environmental'>Tab 3 content</Tab>
          <Tab className="dashboard-tab" eventKey={4} title='Socioeconomic'>Tab 4 content</Tab>
          <Tab className="dashboard-tab" eventKey={5} title='Projects'>Tab 5 content</Tab>
        </Tabs>
      </div>
    )
  }
}
/*<muiTabs initialSelectedIndex={1} justified={true}>
  <muiTab value="pane-1" label="Energy">All of the Things</muiTab>
  <muiTab value="pane-2" label="Water">All of the Things in Water</muiTab>
</muiTabs>*/
export default Dashboard
