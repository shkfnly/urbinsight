import React from 'react';
import classNames from 'classnames';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Tabs as muiTabs } from 'muicss/lib/react/tabs';
import { Tab as muiTab } from 'muicss/lib/react/tab';
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
    let dashboardTabClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-opened-glyph': this.state.opened});

    return(
      <div id="mapDashboard" className={dashboardClass}>
        <span id="dashboardToggle" className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle="tabs" defaultActiveKey={1} className={dashboardTabClass} id="tab-container">
          <Tab className="dashboard-tab" eventKey={1} title='Resource Flows'>
            <Tabs bsStyle="pills" defaultActiveKey={1} className={dashboardTabClass}>
              <Tab className="dashboard-tab" eventKey={1} title='Energy'>Energy content</Tab>
              <Tab className="dashboard-tab" eventKey={2} title='Water'>Water content</Tab>
              <Tab className="dashboard-tab" eventKey={3} title='Materials'>Materials content</Tab>
              <Tab className="dashboard-tab" eventKey={4} title='Food'>Food content</Tab>
              <Tab className="dashboard-tab" eventKey={5} title='Mobility'>Mobility content</Tab>
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
