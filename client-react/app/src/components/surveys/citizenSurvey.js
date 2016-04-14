import React from 'react';
import CitizenSurveyIntro from './citizenSurveyIntro';
import CitizenSurveyLocation from './citizenSurveyLocation';
import CitizenSurveyForm from './citizenSurveyForm';

class CitizenSurvey extends React.Component {
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
      <div id="survey-form-container">
        {active === 'INTRO' ? (
          <CitizenSurveyIntro handleClick={this.handleClick.bind(this)} />
        ) : active === 'LOCATION' ? (
          <CitizenSurveyLocation handleClick={this.handleClick.bind(this)}/>
        ) : active === 'FORM' ? (
          <CitizenSurveyForm handleClick={this.handleClick.bind(this)}/>
        ) : null}
      </div>
    )
  }
}

export default CitizenSurvey
