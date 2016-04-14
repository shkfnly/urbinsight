import React from 'react';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Well } from 'react-bootstrap';

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

export default UmisDataIntro
