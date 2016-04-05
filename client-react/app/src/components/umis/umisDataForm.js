import React from 'react';
import UmisDataIntro from './form_components/UmisDataIntro';
import UmisParcelLocation from './form_components/UmisParcelLocation';
import UmisSourceInformation from './form_components/UmisSourceInformation';
import UmisDescribeParcel from './form_components/UmisDescribeParcel';
import UmisBuildingData from './form_components/UmisBuildingData';
import UmisDemographics from './form_components/UmisDemographics';
import UmisWorkbookContainer from './form_components/UmisWorkbookContainer';
import UmisComplete from './form_components/UmisComplete';

class UmisDataForm extends React.Component {
  constructor(){
    super();
    this.state = {
      active: 'INTRO'
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
        // ) : active === 'SUBMIT' ? (
        //   <UmisSubmit handleClick={this.handleClick.bind(this)}/>
        ) : active === 'COMPLETE' ? (
          <UmisComplete handleClick={this.handleClick.bind(this)}/>
        ) : null}
      </div>
    )
  }
}

export default UmisDataForm
