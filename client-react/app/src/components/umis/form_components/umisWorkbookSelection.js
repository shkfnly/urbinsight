import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UmisWorkbookSelection extends React.Component {
  selectionHandler(value, e){
    // e.preventDefault();
    this.props.selectionHandler(value);
  }
  handleNavigation(value){
    // e.preventDefault();
    this.props.handleNavigation(value);
  }
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }

  render(){
    return(
      <div>
        <h3>Select which workbooks you would like to complete</h3>
        {/*ng-model="workbookSelection.selectedWorkbooks.water" ng-change="workbookSelection.workbookGenerator()"*/}
        <Input label="Water" type="checkbox" onClick={this.selectionHandler.bind(this, "water")}/>
        <Input label="Materials" type="checkbox" onClick={this.selectionHandler.bind(this, "materials")}/>
        <Input label="Energy" type="checkbox" disabled="true"/>
        <Input label="Mobility" type="checkbox" disabled="true"/>
        <br />
          <Col sm={6}>
            <Button bsStyle="info" onClick={this.handleClick.bind(this, 'DEMOGRAPHICS')}>
              <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
            </Button>
          </Col>

        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleNavigation.bind(this, 'forward')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisWorkbookSelection
