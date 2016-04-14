import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

class UmisSourceInformation extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h3>Source Information</h3>
        {/*<form>*/}
        <Input type="text" label="Author:" />
        {/*parcel.date*/}
        <label htmlFor="umis-form-date">Parcel Audit Date: </label>
        <DateTimeField id="umis-form-date"/>
         {/*These would be populated for valid values*/}
         {/*parcel.neighborhoodID*/}
        <Input type="number" label="Neighborhood ID:" />
        {/*ng-model="parcel.timeHorizon"*/}
        <Input label="Time Horizon:" type="select">
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
        </Input>
        <br/>
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'LOCATION')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'DESCRIBE')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisSourceInformation
