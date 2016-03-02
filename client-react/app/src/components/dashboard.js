import React from 'react';
import classNames from 'classnames';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import DashboardResourcePane from './DashboardResource';
import DashboardSocioeconomicPane from './DashboardSocioeconomic';
import { Button } from 'react-bootstrap'


class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      opened: false
    };
    this.update = this.update.bind(this);
  }

  update(e){
    // Set state calls render so necessary changes need to go before setState is called
    this.setState({opened: !this.state.opened})
  }
//onSelect={this.handleSelect}
  handleClick(){
    return;
  }
  render(){
    let dashboardClass = classNames({'dashboard-opened': this.state.opened})
    let dashboardTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened,
      'dashboard-tabs-resources': true
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-opened-glyph': this.state.opened});
    const mountId = "air-quality-graph"

    return(

      <div id="mapDashboard" className={dashboardClass}>
        <span id="dashboardToggle" className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle="tabs" defaultActiveKey={1} className={dashboardTabsClass} justified>
          <Tab eventKey={1} title='Urban Metabolism'>
            <Tabs bsStyle="pills" defaultActiveKey={1} className={dashboardTabsClass} justified>
              <Tab  eventKey={1} title='Energy'>
                <DashboardResourcePane resource="energy" />
              </Tab>
              <Tab  eventKey={2} title='Water'>
                <DashboardResourcePane resource="water"/>
              </Tab>
              <Tab  eventKey={3} title='Materials'>
                <DashboardResourcePane resource="materials"/>
              </Tab>
              <Tab  eventKey={4} title='Food'>
                <DashboardResourcePane resource="food"/>
              </Tab>
              <Tab  eventKey={5} title='Mobility'>
                <DashboardResourcePane resource="mobility"/>
              </Tab>
            </Tabs>
          </Tab>
          {/*The tab below may not be necessary since the data can be embedded within Socioeconomic*/}
          <Tab  eventKey={2} title='Citizen Surveys'>Tab 2 content</Tab>
          <Tab  eventKey={3} title='Environmental'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified>
              <Tab eventKey={1} title='Air'>
              <div className="environmental-pane">
                <div className="air-quality-data-viz">
                  <div className="air-quality-graph" id={mountId}></div>
                  {/* This is actually a custom graph legend*/}
                  <div className="aq-button-list">
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> SO2</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> PM10</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> PM2.5</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> CO</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> O3</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> NOx</Button>
                    <Button className="pollutant" onClick={this.handleClick} bsStyle='warning' block> Pb</Button>
                  </div>
                </div>
                <div className="pollutant-description">
                  <div>
                    <img />
                    <div>
                      <h5>Pollutant</h5>
                      <h5>Type</h5>
                      <h5>Standard</h5>
                      <h5>Averaging Time</h5>
                    </div>
                    <h3>Chemical Structure</h3>
                    <h6>
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                      Lots of Information Lots of Information Lots of Information
                    </h6>
                  </div>
                </div>
              </div>
              </Tab>
              <Tab eventKey={2} title='Water'></Tab>
              <Tab eventKey={3} title='Soil'></Tab>
            </Tabs>
          </Tab>
          <Tab  eventKey={4} title='Socioeconomic'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified>
              <Tab eventKey={1} title='Demographics'>
                <DashboardSocioeconomicPane indicator="demographics"/>
              </Tab>
              <Tab eventKey={2} title='Education'>
                <DashboardSocioeconomicPane indicator="education"/>
              </Tab>
              <Tab eventKey={3} title='Employment'>
                <DashboardSocioeconomicPane indicator="employment"/>
              </Tab>
              {/*<Tab eventKey={4} title='Healthcare' className={dashboardSocioeconomicTabClass}></Tab>*/}
              <Tab eventKey={4} title='Housing'>
                <DashboardSocioeconomicPane indicator="housing"/>
              </Tab>
              <Tab eventKey={5} title='Quality of Life'>
                <DashboardSocioeconomicPane indicator="qualityoflife"/>
              </Tab>
            </Tabs>
          </Tab>
          <Tab  eventKey={5} title='Projects'>Tab 5 content</Tab>
        </Tabs>
      </div>
    )
  }
}

export default Dashboard
