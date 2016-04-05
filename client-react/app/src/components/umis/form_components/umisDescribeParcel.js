import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UmisDescribeParcel extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h3>Describe Parcel</h3>
        {/*parcel.describeParcel.parcelIdentification.parcelType*/}
        <Input type="select" label="Parcel Type:" placeholder="Generic Parcel">
          <option value="Generic Parcel">Generic Parcel</option>
        </Input>
        {/*parcel.describeParcel.parcelIdentification.designatedLandUse*/}
        <Input type="select" label="Designated Land Use:" placeholder="">
          <option value=""></option>
          <option value="Open Space">Open Space</option>
          <option value="Residential">Residential</option>
          <option value="Informal">Informal</option>
          <option value="Commercial">Commercial</option>
          <option value="Institutional">Institutional</option>
          <option value="Industrial">Industrial</option>
          <option value="Municipal">Municipal</option>
        </Input>
        {/*parcel.describeParcel.parcelIdentification.actuallanduse*/}
        <Input type="select" label="Actual Land Use:" placeholder="">
          <option value=""></option>
          <option value="Open Space">Open Space</option>
          <option value="Residential">Residential</option>
          <option value="Informal">Informal</option>
          <option value="Commercial">Commercial</option>
          <option value="Institutional">Institutional</option>
          <option value="Industrial">Industrial</option>
          <option value="Municipal">Municipal</option>
        </Input>
        {/*parcel.describeParcel.parcelIdentification.landArea*/}
        <Input type="number" label="Parcel Area" />
          {/*<label for="parcel-area">Parcel Area (m<sup>2</sup>):</label>*/}
        {/*parcel.describeParcel.parcelIdentification.buildingFootprint*/}
        <Input type="number" label="Building Footprint" />
          {/*<label for="building-footprint">Building Footprint (m<sup>2</sup>):</label>*/}
        <br/>
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'INFORMATION')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'BUILDING')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisDescribeParcel
