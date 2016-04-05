import React from 'react';
import classNames from 'classnames';
import { Well } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import LandcoverPreCalc from './workbooks/water/LandcoverPreCalc';
import WaterDemandJunctions from './workbooks/water/DemandJunctions';
import MaterialsOptionA from './workbooks/materials/OptionA';
import MaterialsOptionB from './workbooks/materials/OptionB';
import MaterialsOptionC from './workbooks/materials/OptionC';

class UmisDataIntro extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
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
        <Button block bsStyle="info" onClick={this.handleClick.bind(this, 'LOCATION')}>
          Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
        </Button>
      </div>
    )
  }
}
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

class UmisBuildingData extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h3>Building Data</h3>
        {/*ng-model="parcel.describeParcel.buildingData.buildingAttachmentType*/}
        <Input type="select" label="Buidling Attachment Type:" placeholder="">
          <option value=""></option>
          <option value="No Building">No Building</option>
          <option value="Single Family">Single Family</option>
          <option value="Multi Family (Low Rise)">Multi Family (4 stories and under)</option>
          <option value="Multi Family (High Rise)">Multi Family (5 stories and over)</option>
          <option value="Row House">Row House</option>
          <option value="Mobile">Mobile</option>
        </Input>
        {/*ng-model="parcel.describeParcel.buildingData.numberOccupiedDwellingUnits"*/}
        <Input type="number" label="Number of Occupied Dwelling Units:" />
         {/*ng-model="parcel.describeParcel.buildingData.buildingAge" */}
        <Input label="Building Age:" type="number"/>
         {/*ng-model="parcel.describeParcel.buildingData.aboveGroundStories" */}
        <Input label="Above Ground Stories:" type="number"/>
         {/*ng-model="parcel.describeParcel.buildingData.belowGroundStories"*/}
        <Input label="Below Ground Stories:" type="number" />
         {/*ng-model="parcel.describeParcel.buildingData.interiorFloorSpace"*/}
        <Input label="Interior Floor Space:" type="number" />
         {/*ng-model="parcel.describeParcel.buildingData.separateDwellingUnits"*/}
        <Input label="Separate Dwelling Units:" type="number" />
         {/*ng-model="parcel.describeParcel.buildingData.foundationType"*/}
        <Input label="Foundation Type:" type="select" placeholder="">
          <option value=""></option>
          <option value="Slab-on-Grade">Slab-on-Grade</option>
          <option value="Crawl Space">Crawl Space</option>
          <option value="Earth Floor">Earth Floor</option>
          <option value="Unconditioned Parking">Unconditioned Parking</option>
          <option value="Full Basement">Full Basement</option>
        </Input>
         {/*ng-model="parcel.describeParcel.buildingData.wallType"*/}
        <Input label="Wall Type:" type="select" placeholder="">
          <option value=""></option>
          <option value="Solid Masonry">Solid Masonry</option>
          <option value="Concrete">Concrete</option>
          <option value="Hollow Core Brick">Hollow Core Brick</option>
          <option value="Steel Frame">Steel Frame</option>
          <option value="Wood Frame">Wood Frame</option>
          <option value="Mud">Mud</option>
          <option value="Glass">Glass</option>
        </Input>
         {/*ng-model="parcel.describeParcel.buildingData.roofType"*/}
        <Input label="Roof Type:" type="select" placeholder="">
          <option value=""></option>
          <option value="Flat">Flat</option>
          <option value="Peaked Hard Surface">Peaked Hard Surface</option>
          <option value="Thatch">Thatch</option>
        </Input>
        <br/>
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'DESCRIBE')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'DEMOGRAPHICS')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

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

class UmisWorkbookContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      available: ['selection','water','materials','submit'],
      active: 'selection',
      queue: [0, 3],
      pos: 0,
    }
  }
  selectionHandler(value, e){
    let queue = this.state.available;
    // Add the workbook selection
    let position = queue.indexOf(value)
    let current = this.state.queue
    if (current.indexOf(position) === -1) {
      current =  current.slice(0, (current.length-1)).concat(position).concat(current.slice((current.length-1)))
    } else {
      let avail_position = (current.indexOf(position))
      current = current.slice(0, avail_position).concat(current.slice(avail_position+1))
    }
    this.setState({queue: current})
  }
  handleClick(panel, e){
    // e.preventDefault();
    this.props.handleClick(panel);
  }
  handleNavigation(nextSection){
    let currPos = this.state.pos;
    let currQueue = this.state.queue;
    let newLocation, newActive;
    if(nextSection === "forward"){
      currPos++;
      newLocation = currQueue[currPos]
      newActive = this.state.available[newLocation]
    } else if (nextSection === "back") {
      currPos--;
      newLocation = currQueue[currPos];
      newActive = this.state.available[newLocation]
      if(newActive === 'selection'){
        currQueue = [0, 3]
      }
    }
    this.setState({active: newActive,
                   pos: currPos,
                   queue: currQueue})
  }
  render(){
    let active = this.state.active;
    return(
      <div>
        {active === 'selection' ? (
          <UmisWorkbookSelection handleClick={this.handleClick.bind(this)} handleNavigation={this.handleNavigation.bind(this)} selectionHandler={this.selectionHandler.bind(this)}/>
        ) : active === 'water' ? (
          <UmisWaterWorkbook handleNavigation={this.handleNavigation.bind(this)}/>
        ) : active === 'materials' ? (
          <UmisMaterialsWorkbook handleNavigation={this.handleNavigation.bind(this)}/>
        ) : active === 'submit' ? (
          <UmisSubmit handleNavigation={this.handleNavigation.bind(this)} handleClick={this.handleClick.bind(this)}/>
        ) : null}
      </div>
    )
  }
}

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



class UmisWaterWorkbook extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleNavigation(panel);
  }
  render(){
    return(
      <div>
        <h3>Water Workbook</h3>
        <LandcoverPreCalc />
        <WaterDemandJunctions />
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'back')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'forward')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

class UmisMaterialsWorkbook extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleNavigation(panel);
  }
  render(){
    return(
      <div>
        <h3>Materials Workbook</h3>

        <h3>Estimate Demand</h3>
        <Input name="optionSelection" label="Option A:" type="radio" />
        <Input name="optionSelection" label="Option B:" type="radio" />
        <Input name="optionSelection" label="Option C:" type="radio" />
        {/*<div ng-show="optionSelected === 'A'">*/}

        <MaterialsOptionA/>
        <MaterialsOptionB/>
        <MaterialsOptionC/>
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'back')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'forward')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

class UmisSubmit extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  handleNavigation(panel, e){
    e.preventDefault();
    this.props.handleNavigation(panel);
  }
  render(){
    return(
      <div>
        <h3>Submit Parcel Audit</h3>
        <br />
        {/*<Col sm={6} offset={3}>
          <Button id="submit-button" ng-click="umisSubmit()" type="submit" className="btn btn-danger btn-lg btn-block" ui-sref="app.city.pilot.umis.form.endPage">Submit</Button>

        </Col>*/}
        {/*<Col sm={6}>*/}
          <Button bsStyle="info" onClick={this.handleNavigation.bind(this, 'back')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        {/*</Col>*/}
        {/*<Col sm={6}>*/}
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'COMPLETE')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        {/*</Col>*/}
      </div>
    )
  }
}

class UmisComplete extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleClick(panel);
  }
  render(){
    return(
      <div>
        <h2 style={{"textAlign": "center"}}>Congratulations you've finished a parcel audit</h2>
        {/*<Col sm={6} offset={6}>*/}
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'INTRO')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span>Return to Beginning
          </Button>
        {/*</Col>*/}
      </div>
    )
  }
}
class UmisDataForm extends React.Component {
  constructor(){
    super();
    this.state = {
      active: 'WBCONTAINER'
    }
  }
  handleClick(panel){
    let active = this.state.active;
    let newActive = panel;
    this.setState({
      active: newActive
    })
  }

  render(){
    let active = this.state.active;
    return(
      <div>
        {active === 'INTRO' ? (
          <UmisDataIntro handleClick={this.handleClick.bind(this)} />
        ) : active === 'LOCATION' ? (
          <UmisParcelLocation handleClick={this.handleClick.bind(this)} />
        ) : active === 'INFORMATION' ? (
          <UmisSourceInformation handleClick={this.handleClick.bind(this)} />
        ) : active === 'DESCRIBE' ? (
          <UmisDescribeParcel handleClick={this.handleClick.bind(this)} />
        ) : active === 'BUILDING' ? (
          <UmisBuildingData handleClick={this.handleClick.bind(this)} />
        ) : active === 'DEMOGRAPHICS' ? (
          <UmisDemographics handleClick={this.handleClick.bind(this)} />
        // ) : active === 'SELECTION' ? (
        //   <UmisWorkbookSelection handleClick={this.handleClick.bind(this)} />
        ) : active === 'WBCONTAINER' ? (
          <UmisWorkbookContainer handleClick={this.handleClick.bind(this)} />
        // ) : active === 'WATER' ? (
        //   <UmisWaterWorkbook handleClick={this.handleClick.bind(this)}/>
        // ) : active === 'MATERIALS' ? (
        //   <UmisMaterialsWorkbook handleClick={this.handleClick.bind(this)}/>
        ) : active === 'SUBMIT' ? (
          <UmisSubmit handleClick={this.handleClick.bind(this)}/>
        ) : active === 'COMPLETE' ? (
          <UmisComplete handleClick={this.handleClick.bind(this)}/>
        ) : null}
      </div>
    )
  }
}

export default UmisDataForm
