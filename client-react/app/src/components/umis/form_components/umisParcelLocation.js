import React from 'react';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class UmisParcelLocation extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h3>Place Parcel on the Map</h3>
        <h5>To begin a parcel audit click the map to place a marker on the map where the data is derived from</h5>
        <h5>The marker can be moved by simply clicking the map again, the marker location will be updated automatically and assigned to the data</h5>
        <br />
        {/*parcel.describeParcel.parcelIdentification.geoCoordinates[1]*/}
        <Input type="number" label="Latitude:" />
        {/*parcel.describeParcel.parcelIdentification.geoCoordinates[0]*/}
        <Input type="number" label="Longitude:" />
        <br />
        <br />
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'INTRO')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'INFORMATION')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisParcelLocation
