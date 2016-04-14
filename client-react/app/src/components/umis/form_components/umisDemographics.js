import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UmisDemographics extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h3>Demographics</h3>
        <h5>List number of residents</h5>
        <br/>
        <h4>Seniors and Retired</h4>
        // ng-model="parcel.describeParcel.demographics.seniors.livingWorking" min="0"/
        <Input label="Living and Working on Parcel:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.seniors.livingOffWorking" min="0"/
        <Input label="Living on Parcel, Working/Studying Offsite:" type="number" />
          {/*ng-model="parcel.describeParcel.demographics.seniors.visitingWork" min="0"/*/}
        <Input label="Visiting Parcel for Full-Time Work:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.seniors.visitingPartTimeWork" min="0"/
        <Input lable="Visiting Parcel for Part-Time Work:" type="number" />
        <br />
        <h4>Adults</h4>
        // ng-model="parcel.describeParcel.demographics.adults.livingWorking" min="0"/
        <Input label="Living and Working on Parcel:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.adults.livingOffWorking" min="0"/
        <Input label="Living on Parcel, Working/Studying Offsite:" type="number" />
          {/*ng-model="parcel.describeParcel.demographics.adults.visitingWork" min="0"/*/}
        <Input label="Visiting Parcel for Full-Time Work:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.adults.visitingPartTimeWork" min="0"/
        <Input lable="Visiting Parcel for Part-Time Work:" type="number" />
        <br />
        <h4>Youth</h4>
        // ng-model="parcel.describeParcel.demographics.adults.livingWorking" min="0"/
        <Input label="Living and Working on Parcel:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.adults.livingOffWorking" min="0"/
        <Input label="Living on Parcel, Working/Studying Offsite:" type="number" />
          {/*ng-model="parcel.describeParcel.demographics.adults.visitingWork" min="0"/*/}
        <Input label="Visiting Parcel for Full-Time Work:" type="number" />
        //  ng-model="parcel.describeParcel.demographics.adults.visitingPartTimeWork" min="0"/
        <Input lable="Visiting Parcel for Part-Time Work:" type="number" />
        <br />
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'BUILDING')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'WBCONTAINER')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisDemographics
