import React from 'react';
import UmisWorkbookSelection from './umisWorkbookSelection';
import UmisWaterWorkbook from '../workbooks/water/waterWorkbook'
import UmisMaterialsWorkbook from '../workbooks/materials/materialsWorkbook';
import UmisSubmit from './UmisSubmit';

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

export default UmisWorkbookContainer
