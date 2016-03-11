import React from 'react';
import classNames from 'classnames';
import { Well } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

class UmisDataForm extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <h2 style={{"textAlign": "center"}}>Urban Metabolism Information System</h2>
        <Well>
          <h3 style={{"textAlign": "center"}}>
            UMIS is an participatory framework for the collection of data on resource
            flows through urban environments to gain insights into how to make cities more sustainable.
          </h3>
        </Well>
        <h5 style={{"textAlign": "center"}}>To begin adding a parcel audit please click the button below</h5>
        <Button block bsStyle="info">
          Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
        </Button>

        <h3>Place Parcel on the Map</h3>
        <h5>To begin a parcel audit click the map to place a marker on the map where the data is derived from</h5>
        <h5>The marker can be moved by simply clicking the map again, the marker location will be updated automatically and assigned to the data</h5>
        <br />
        <Input type="number" label="Latitude:"/>
        <Input type="number" label="Longitude:"/>
        <br />
        <br />
        <Col sm={6}>
          <Button bsStyle="info">
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success">
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
        {/*Add form authencity token */}
        <h3>Source Information</h3>
        <form>
          <Input type="text" label="Author:"/>
          <label htmlFor="umis-form-date">Parcel Audit Date: </label>
          <DateTimeField id="umis-form-date"/>
           {/*These would be populated for valid values*/}
          <Input type="number" label="Neighborhood ID:" />

           {/*Time Horizon: <select ng-model="parcel.timeHorizon">
                          <option value="2014">2014</option>
                          <option value="2015">2015</option>
                          <option value="2016">2016</option>
                          </select>*/}
          <br/>
          <Col sm={6}>
            <Button bsStyle="info">
              <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
            </Button>
          </Col>
          <Col sm={6}>
            <Button bsStyle="success">
              Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
            </Button>
          </Col>
        </form>
        <h3>Describe Parcel</h3>
        <Input type="select" label="Parcel Type:" placeholder="Generic Parcel">
          <option value="Generic Parcel">Generic Parcel</option>
        </Input>
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
        <Input type="number" label="Parcel Area" />
          {/*<label for="parcel-area">Parcel Area (m<sup>2</sup>):</label>*/}
        <Input type="number" label="Building Footprint" />
          {/*<label for="building-footprint">Building Footprint (m<sup>2</sup>):</label>*/}
        <Col sm={6}>
          <Button bsStyle="info">
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success">
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisDataForm
