import React from 'react';
import classNames from 'classnames';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import DashboardResourcePane from './DashboardResource';



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
  render(){
    let dashboardClass = classNames({'dashboard-opened': this.state.opened})
    let dashboardTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened,
      'dashboard-tabs-resources': true
    })
    let dashboardTabClass = classNames({
      'dashboard-tab-resources': true
    })
    let dashboardSocioeconomicTabClass = classNames({
      'dashboard-tab-resources': true,
      'dashboard-socioeconomic-tab': true,
      'nav-pills': true
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-opened-glyph': this.state.opened});

    return(
      <div id="mapDashboard" className={dashboardClass}>
        <span id="dashboardToggle" className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle="tabs" defaultActiveKey={1} className={dashboardTabsClass}>
          <Tab eventKey={1} title='Urban Metabolism'>
            <Tabs bsStyle="pills" defaultActiveKey={1} className={dashboardTabsClass}>
              <Tab  eventKey={1} title='Energy' className={dashboardTabClass}>
                <DashboardResourcePane resource="energy"/>
              </Tab>
              <Tab  eventKey={2} title='Water' className={dashboardTabClass}>
                <DashboardResourcePane resource="water"/>
              </Tab>
              <Tab  eventKey={3} title='Materials' className={dashboardTabClass}>
                <DashboardResourcePane resource="materials"/>
              </Tab>
              <Tab  eventKey={4} title='Food' className={dashboardTabClass}>
                <DashboardResourcePane resource="food"/>
              </Tab>
              <Tab  eventKey={5} title='Mobility' className={dashboardTabClass}>
                <DashboardResourcePane resource="mobility"/>
              </Tab>
            </Tabs>
          </Tab>
          {/*The tab below may not be necessary since the data can be embedded within Socioeconomic*/}
          <Tab  eventKey={2} title='Citizen Surveys'>Tab 2 content</Tab>

          <Tab  eventKey={3} title='Environmental'>Tab 3 content</Tab>
          <Tab  eventKey={4} title='Socioeconomic'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass}>
              <Tab eventKey={1} title='Demographics' className={dashboardSocioeconomicTabClass}></Tab>
              <Tab eventKey={2} title='Education' className={dashboardSocioeconomicTabClass}></Tab>
              <Tab eventKey={3} title='Employment' className={dashboardSocioeconomicTabClass}></Tab>
              {/*<Tab eventKey={4} title='Healthcare' className={dashboardSocioeconomicTabClass}></Tab>*/}
              <Tab eventKey={4} title='Housing' className={dashboardSocioeconomicTabClass}></Tab>
              <Tab eventKey={5} title='Quality of Life' className={dashboardSocioeconomicTabClass}></Tab>
            </Tabs>
          </Tab>
          <Tab  eventKey={5} title='Projects'>Tab 5 content</Tab>
        </Tabs>
      </div>
    )
  }
}

export default Dashboard
