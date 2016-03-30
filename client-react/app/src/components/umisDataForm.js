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
        {/*parcel.describeParcel.parcelIdentification.geoCoordinates[1]*/}
        <Input type="number" label="Latitude:" />
        {/*parcel.describeParcel.parcelIdentification.geoCoordinates[0]*/}
        <Input type="number" label="Longitude:" />
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
            <Button bsStyle="info">
              <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
            </Button>
          </Col>
          <Col sm={6}>
            <Button bsStyle="success">
              Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
            </Button>
          </Col>







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
          <Button bsStyle="info">
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success">
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>





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
            <Button bsStyle="info">
              <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
            </Button>
          </Col>
          <Col sm={6}>
            <Button bsStyle="success">
              Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
            </Button>
          </Col>






          <h3>Demographics - <h5>List number of residents</h5></h3>
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
            <Button bsStyle="info">
              <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
            </Button>
          </Col>
          <Col sm={6}>
            <Button bsStyle="success">
              Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
            </Button>
          </Col>




          <h3>Select which workbooks you would like to complete</h3>
          // ng-model="workbookSelection.selectedWorkbooks.water" ng-change="workbookSelection.workbookGenerator()"
          <Input label="Water" type="checkbox" />
          <Input label="Materials" type="checkbox" />
          <Input label="Energy" type="checkbox" />
          <Input label="Mobility" type="checkbox" />
          <br />



          <h3>Water Workbook</h3>
          <LandcoverPreCalc />
          <WaterDemandJunctions />

    <h3>Estimate Demand</h3>
    <label class="radio-inline"><input name="optionSelection" type="radio" ng-model='optionSelected' value='A' checked/>Option A</label>
    <label class="radio-inline"><input name="optionSelection" type="radio" ng-model='optionSelected' value='B'/>Option B</label>
    <label class="radio-inline"><input name="optionSelection" type="radio" ng-model='optionSelected' value='C'/>Option C</label>
    <div ng-show="optionSelected === 'A'">
      <h3>Option A:</h3>
      <label>Total Weight (kg): <input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionA.totalWeight" /></label>
      <table>
        <tr>
          <th>Category</th>
          <th>%</th>
        </tr>
        <tr>
          <td><label for="paper">Paper</label></td>
          <td><input type="number" id="paper" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.paper" /></td>
        </tr>
        <tr>
          <td><label for="organics">Organics</label></td>
          <td><input type="number" id="organics" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.organics" /></td>
        </tr>
        <tr>
          <td><label for="plastics">Plastics</label></td>
          <td><input type="number" id="plastics" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.plastics" /></td>
        </tr>
        <tr>
          <td><label for="textiles">Textiles</label></td>
          <td><input type="number" id="textiles" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.textiles" /></td>
        </tr>
        <tr>
          <td><label for="metals">Metals</label></td>
          <td><input type="number" id="metals" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.metals" /></td>
        </tr>
        <tr>
          <td><label for="glass">Glass</label></td>
          <td><input type="number" id="glass" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.glass" /></td>
        </tr>
        <tr>
          <td><label for="trimmings">Trimmings</label></td>
          <td><input type="number" id="trimmings" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.trimmings" /></td>
        </tr>
        <tr>
          <td><label for="appliances">Appliances</label></td>
          <td><input type="number" id="appliances" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.appliances" /></td>
        </tr>
        <tr>
          <td><label for="hazardousWaste">Hazardous Waste</label></td>
          <td><input type="number" id="hazardousWaste" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.hazardousWaste" /></td>
        </tr>
        <tr>
          <td><label for="inertsAndOthers">Inerts and Others</label></td>
          <td><input type="number" id="inertsAndOthers" ng-model="parcel.workbooks.materials.estimateDemand.optionA.demandJunctions.inertsAndOthers" /></td>
        </tr>
      </table>
    </div>
    <div ng-show="optionSelected === 'B'">
      <h3>Option B:</h3>
      <label>Kilograms:<input name="paperUnits" type="radio" checked="true" value="KG" /></label>
      <label>Percentage:<input name="paperUnits" type="radio" value="%" /></label>
      <table>
        <tr>
          <th>Paper</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="usedPaper">Used Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.usedPaper" id="usedPaper" /></td>
          <td>Full toilet paper roll (0.2 kg)</td>
        </tr>
        <tr>
          <td><label for="officeSupplies">Office Supplies</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.officeSupplies" id="officeSupplies" /></td>
          <td>Yellow Legal Pad (0.2 kg)</td>
        </tr>
        <tr>
          <td><label for="phonebook">Phonebook</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.phonebook" id="phonebook" /></td>
          <td>Phonebook (1.8 kg)</td>
        </tr>
        <tr>
          <td><label for="newsprint">Newsprint</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.newsprint" id="newsprint" /></td>
          <td>Newspaper (0.6 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="computerPaper">Computer Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.computerPaper" id="computerPaper" /></td>
          <td>Computer Paper (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="corrugatedCardboard">Corrugated Cardboard</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.corrugatedCardboard" id="corrugatedCardboard" /></td>
          <td>Cardboard flattend, Loose (0.03 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="mixedWastePaper">Mixed Waste Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.mixedWastePaper" id="mixedWastePaper" /></td>
          <td>Mixed paper, Loose (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="nonRecyclablePaper">Non-recyclable Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.nonRecyclablePaper" id="nonRecyclablePaper" /></td>
          <td>Magazine, Loose (0.6 kg/cubic dm)</td>
        </tr>
      </table>
      <br />
      <label>Kilograms:<input name="organicsUnits" type="radio" checked="true" value="KG" /></label>
      <label>Percentage:<input name="organicsUnits" type="radio" value="%" /></label>
      <table>
        <tr>
          <th>Organics</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="starches">Starches</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.starches.amount" id="starches" /></td>
          <td>Break, Bulk (0.3 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="fish">Proteins - Fish</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.fish" id="fish" /></td>
          <td>Fish, Scraps (0.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="meat">Proteins - Meat</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.meat" id="meat" /></td>
          <td>Meat, Ground (0.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="shells">Proteins - Oyster Shells</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.shells" id="shells" /></td>
          <td>Oyster Shells, Whole (1.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="milk">Dairy - Milk</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.milk" id="milk" /></td>
          <td>Milk (1.0 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="cheese">Dairy - Cheese</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.cheese" id="cheese" /></td>
          <td>Cheese (0.5 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="butter">Dairy - Butter</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.butter" id="butter" /></td>
          <td>Butter (1.0 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="solidFat">Fats - Solid Fat</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.fats.solidFat" id="solidFat" /></td>
          <td>Solid Fat (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="oil">Fats - Oil, Cooking</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.fats.cookingOil" id="oil" /></td>
          <td>Oil, Cooking (0.9 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="produceWaste">Produce - Produce Waste</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.produce.produceWaste" id="produceWaste" /></td>
          <td>Produce waste, mixed (0.9 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="foodWaste">Other - Food Waste</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.other.foodWaste" id="foodWaste" /></td>
          <td>Food waste, as animal feed (0.6 kg/cubic dm)</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="plasticUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="plasticUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Plastics</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="largeBottles">Bottles - PETE large bottles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.largeBottles" id="largeBottles" /></td>
          <td>PETE large bottles (0.05 kg)</td>
        </tr>
        <tr>
          <td><label for="smallBottles">Bottles - PETE small bottles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.smallBottles" id="smallBottles" /></td>
          <td>PETE small bottles (0.02 kg)</td>
        </tr>
        <tr>
          <td><label for="unpigmented">Bottles - HDPE bottles, unpigmented</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.unpigmented" id="unpigmented" /></td>
          <td>HDPE bottles, unpigmented (0.02 kg)</td>
        </tr>
        <tr>
          <td><label for="pigmented">Bottles - HDPE bottles, pigmented</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.pigmented" id="pigmented" /></td>
          <td>HDPE bottles, pigmented (0.03 kg)</td>
        </tr>
        <tr>
          <td><label for="beverageCase">Plastic Film - HDPE beverage case</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.beverageCase" id="beverageCase" /></td>
          <td>HDPE beverage case (0.54 kg)</td>
        </tr>
        <tr>
          <td><label for="breadCase">Plastic Film - HDPE bread case</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.breadCase" id="breadCase" /></td>
          <td>HDPE bread case (0.68 kg)</td>
        </tr>
        <tr>
          <td><label for="gallonContainer">Plastic Film - HDPE gallon container</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.gallonContainer" id="gallonContainer" /></td>
          <td>HDPE gallon container (0.03 kg)</td>
        </tr>
        <tr>
          <td><label for="bags">Bags - Plastic bags</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bags.amount" id="bagsSmall" /></td>
          <td>Plastic bags (0.01 kg)</td>
        </tr>
        <tr>
          <td><label for="styrofoam">Packaging - Styrofoam Kernels</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.styrofoamKernels" id="styrofoam" /></td>
          <td>Styrofoam kernels (0.004 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="polystyrene">Packaging - Polystyrene foam</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.polystyreneFoam" id="polystyrene" /></td>
          <td>Polystyrene foam (0.01 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="pet">Packaging - PET uncompacted</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.petUncompacted" id="pet" /></td>
          <td>PET uncompacted (0.02 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="otherPlastics">Other plastics</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.other.amount" id="otherPlastics" /></td>
          <td>Other plastics</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="textileUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="textileUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Textiles</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="sweaters">Clothes - Wool Sweaters</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.sweaters" id="sweaters" /></td>
          <td>Wool Sweaters (0.5 kg)</td>
        </tr>
        <tr>
          <td><label for="shirts">Clothes - Shirts</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.shirts" id="shirts" /></td>
          <td>Shirts (0.2 kg)</td>
        </tr>
        <tr>
          <td><label for="pants">Clothes - Pants</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.pants" id="pants" /></td>
          <td>Pants (0.6 kg)</td>
        </tr>
        <tr>
          <td><label for="socks">Clothes - Socks</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.socks" id="socks" /></td>
          <td>Socks (0.1 kg)</td>
        </tr>
        <tr>
          <td><label for="leatherShoes">Shoes - Leather pair</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.shoes.leather" id="leatherShoes" /></td>
          <td>Leather pair (0.9 kg)</td>
        </tr>
        <tr>
          <td><label for="canvasShoes">Shoes - Canvas pair</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.shoes.canvas" id="canvasShoes" /></td>
          <td>Canvas pair (0.8 kg)</td>
        </tr>
        <tr>
          <td><label for="towels">Linens - Bath Towels</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.linens.towels" id="towels" /></td>
          <td>Bath Towels (3.7 kg)</td>
        </tr>
        <tr>
          <td><label for="sheets">Linens - Sheets</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.linens.sheets" id="sheets" /></td>
          <td>Sheets (1.9 kg)</td>
        </tr>
        <tr>
          <td><label for="tablecloths">Large Textiles - Tablecloths</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.tablecloths" id="tablecloths" /></td>
          <td>Tablecloths (0.002 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label for="carpet">Large Textiles - Carpet</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.carpet" id="carpet" /></td>
          <td>Carpet (0.02 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label for="canvas">Large Textiles - Canvas</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.canvas" id="canvas" /></td>
          <td>Canvas (0.005 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label for="looseClothing">Mixed Clothing - Clothing, mixed loose</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.mixedClothing.looseClothing" id="looseClothing" /></td>
          <td>Clothing, mixed loose (0.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="compactClothing">Mixed Clothing - Clothing, mixed compacted</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.mixedClothing.compactClothing" id="compactClothing" /></td>
          <td>Clothing, mixed compacted(0.1 kg/cubic dm)</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="metalsUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="metalsUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Metals</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="steelCans">Tin Coated Steel Cans</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.steelCans.amount" id="steelCans" /></td>
          <td>Tin Coated Steel Cans (0.3 kg)</td>
        </tr>
        <tr>
          <td><label for="tinCans">Tin Cans, ferrous</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.tinCans.amount" id="tinCans" /></td>
          <td>Tin Coated, ferrous (0.4 kg)</td>
        </tr>
        <tr>
          <td><label for="petFood">Pet Food Tin Can, ferrous</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.petFood.amount" id="petFood" /></td>
          <td>Pet Food Tin Can, ferrous (0.3 kg)</td>
        </tr>
        <tr>
          <td><label for="aluminumCans">Aluminum Cans (whole)</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.aluminumCans.amount" id="aluminumCans" /></td>
          <td>Aluminum Cans (whole) (0.3 kg)</td>
        </tr>
        <tr>
          <td><label for="oilFilters">Used Oil Filters</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.oilFilters.amount" id="oilFilters" /></td>
          <td>Used Oil Filters (0.2 kg)</td>
        </tr>
        <tr>
          <td><label for="radiator">Radiator, ferrous (19 Liters)</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.radiator.amount" id="radiator" /></td>
          <td>Radiator, ferrous (19 Liters) (1.0 kg)</td>
        </tr>
        <tr>
          <td><label for="aluminumFoil">Aluminum Foil</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.aluminumFoil.amount" id="aluminumFoil" /></td>
          <td>Aluminum Foil (2.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="compositeMetal">Remainder/Composite Metal</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.compositeMetal.amount" id="compositeMetal" /></td>
          <td>Remainder/Composite Metal (0.5 kg/cubic dm)</td>
        </tr>
        <tr>
      </table>
      <br/>
      <label>Kilograms:<input name="glassUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="glassUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Glass</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="standardBottles">Bottles - Standard Bottles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.standardBottles" id="standardBottles" /></td>
          <td>Standard Bottles (0.2 kg)</td>
        </tr>
        <tr>
          <td><label for="largerBottles">Bottles - Larger Bottles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.largerBottles" id="largerBottles" /></td>
          <td>Larger Bottles (0.4 kg)</td>
        </tr>
        <tr>
          <td><label for="jugs">Bottles - Jugs</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.jugs" id="jugs" /></td>
          <td>Jugs (1.1 kg)</td>
        </tr>
        <tr>
          <td><label for="windowGlass">Windows - Window Glass</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.windows.windowGlass" id="windowGlass" /></td>
          <td>Window Glass (2.4 mm thick) (0.1 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label for="mixedGlass">Mixed Glass - Composite or Broken Glass</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.mixedGlass.compositeGlass" id="mixedGlass" /></td>
          <td>Composite or Broken Glass (1.3 kg/cubic dm)</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="trimmingsUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="trimmingsUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Trimmings</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="yardTrimming">Garden Waste - Yard Trimming, mixed</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.yardTrimming" id="yardTrimming" /></td>
          <td>Yard Trimming, mixed (0.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="grassClipping">Garden Waste - Grass Clippings</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.grassClippings" id="grassClippings" /></td>
          <td>Grass Clippings (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="leaves">Garden Waste - Leaves</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.leaves" id="leaves" /></td>
          <td>Leaves (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="largeLimbs">Garden Waste - Large Limbs and Stumps</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.largeLimbsandStumps" id="largeLimbs" /></td>
          <td>Large Limbs and Stumps (0.6 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="dryPrunings">Garden Waste - Prunings, dry</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.dryPrunings" id="dryPrunings" /></td>
          <td>Prunings, dry (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="greenPrunings">Garden Waste - Prunings, green</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.greenPrunings" id="greenPrunings" /></td>
          <td>Prunings, green (0.03 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="baledStraw">Garden Waste - Hay/Straw, baled</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.baledStraw" id="baledStraw" /></td>
          <td>Hay/Straw, baled (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="looseStraw">Garden Waste - Hay/Straw, loose</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.looseStraw" id="baledStraw" /></td>
          <td>Hay/Straw, loose (0.05 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="compost">Garden Waste - Compost</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.compost" id="compost" /></td>
          <td>Compost (0.6 kg/cubic dm)</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="applianceUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="applianceUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Appliances</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="airConditioner">Major Appliances - Air Conditioner</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.airConditioner" id="airConditioner" /></td>
          <td>Air Conditioner (29.1 kg)</td>
        </tr>
        <tr>
          <td><label for="microwave">Major Appliances - Microwave</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.microwave" id="microwave" /></td>
          <td>Microwave (22.7 kg)</td>
        </tr>
        <tr>
          <td><label for="waterHeater">Major Appliances - Water Heater</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.waterHeater" id="waterHeater" /></td>
          <td>Water Heater (59.4 kg)</td>
        </tr>
        <tr>
          <td><label for="incandescentBulbs">Lighting - Incandescent Bulbs</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.lighting.incandescentBulbs" id="incandescentBulbs" /></td>
          <td>Incandescent Bulbs (0.031 kg)</td>
        </tr>
        <tr>
          <td><label for="fluorescentBulbs">Lighting - Fluorescent Bulbs</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.lighting.fluorescentBulbs" id="fluorescentBulbs" /></td>
          <td>Fluorescent Bulbs (4ft Ballast) (1.6 kg)</td>
        </tr>
        <tr>
          <td><label for="otherAppliances">Other - Miscellaneous Appliances</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.other.amount" id="otherAppliances" /></td>
          <td>Uncategorized Appliances</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="hazardousUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="hazardousUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Hazardous Waste</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="paints">Paints</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.paint.amount" id="paints" /></td>
          <td>Paints (3.6 kg)</td>
        </tr>
        <tr>
          <td><label for="antifreeze">Antifreeze</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.antifreeze.amount" id="antifreeze" /></td>
          <td>Antifreeze (4.3 kg)</td>
        </tr>
        <tr>
          <td><label for="usedMotorOil">Used Motor Oil</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.usedMotorOil.amount" id="usedMotorOil" /></td>
          <td>Used Motor Oil (0.8 kg)</td>
        </tr>
        <tr>
          <td><label for="motorVehicleBatteries">Motor Vehicle Batteries</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.motorVehicleBatteries.amount" id="motorVehicleBatteries" /></td>
          <td>Motor Vehicle Batteries (18.1 kg)</td>
        </tr>
        <tr>
          <td><label for="tires">Tire, passenger car</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.tires.amount" id="tires" /></td>
          <td>Tire, passenger car (6.5 kg)</td>
        </tr>
      </table>
      <br/>
      <label>Kilograms:<input name="inertsUnits" type="radio" checked="true" value="KG"></label>
      <label>Percentage:<input name="inertsUnits" type="radio" value="%"></label>
      <table>
        <tr>
          <th>Inerts and Others</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label for="concrete">Construction materials - Concrete</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.concrete" id="concrete" /></td>
          <td>Concrete (1.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="asphaltPaving">Construction materials - Asphalt Paving</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.asphaltPaving" id="asphaltPaving" /></td>
          <td>Asphalt Paving (.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="asphaltRoofing">Construction materials - Asphalt Roofing</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.asphaltRoofing" id="asphaltRoofing" /></td>
          <td>Asphalt Roofing (1.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="brick">Construction materials - Brick</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.brick" id="brick" /></td>
          <td>Brick (1.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="fiberglassInsulation">Construction materials - Fiberglass Insulation</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.fiberglassInsulation" id="fiberglassInsulation" /></td>
          <td>Fiberglass Insulation (0.01 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="gypsum">Construction materials - Gypsum Board</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.gypsumBoard" id="gypsum" /></td>
          <td>Gypsum Board (2.3 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label for="woodAshes">Construction materials - Wood Ashes</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.woodAshes" id="woodAshes" /></td>
          <td>Wood Ashes (0.8 kg/cubic dm)</td>
        </tr>
      </table>
    </div>
      <br />
      <div ng-show="optionSelected === 'C'">
        <h3>Option C:</h3>
        <h4>Enter weight by category</h4>
      <table>
        <tr>
          <td><label for="paperTotalWeight">Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.paper.totalWeight" id="paperTotalWeight" />
        </tr>
        <tr>
          <td><label for="organicTotalWeight">Organics</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.organics.totalWeight.amount" id="organicTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="plasticsTotalWeight">Plastics</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.plastics.totalWeight.amount" id="plasticsTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="textilesTotalWeight">Textiles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.textiles.totalWeight.amount" id="textilesTotalWeight:" /></td>
        </tr>
          <td><label for="metalTotalWeight">Metals</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.metals.totalWeight.amount" id="metalTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="glassTotalWeight">Glass</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.glass.totalWeight.amount" id="glassTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="trimmingsTotalWeight">Trimmings</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.trimmings.totalWeight.amount" id="trimmingsTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="appliancesTotalWeight">Appliances</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.appliances.totalWeight.amount" id="appliancesTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="hazardousTotalWeight">Hazardous Waste</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.harzardousWaste.totalWeight.amount" id="hazardousTotalWeight" /></td>
        </tr>
        <tr>
          <td><label for="inertTotalWeight">Inert and Others</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.inerts.totalWeight.amount" id="inertTotalWeight" /></td>
        </tr>
      </table>
      </div>
      <br />
        <div class="col-sm-6">
      <a ui-sref="app.city.pilot.umis.form.workbookSelection" class="btn btn-block btn-info">
        <span class="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
      </a>
    </div>
    <div class="col-sm-6">
      <a class="btn btn-block btn-success" ng-click="workbookSelection.workbookIterator()">
        Next Section <span class="glyphicon glyphicon-circle-arrow-right"></span>
      </a>
    </div>*/}*/}
    </div>
    )
  }
}

export default UmisDataForm
