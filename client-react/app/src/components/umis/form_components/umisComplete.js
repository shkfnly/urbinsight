import React from 'react';
import { Button } from 'react-bootstrap';

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

export default UmisComplete
