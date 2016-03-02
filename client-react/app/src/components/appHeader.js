import React from 'react';
import GLMap from './GLMap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
class AppHeader extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // this.props.addSteps([
    //   {
    //     title: 'Login',
    //     text: 'Please Start '
    //   }
    // ])
  }
  render(){
    return (
      <Navbar inverse fluid fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><img id="header-logo" src="./urbinsight_logo_v1.png"></img></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Partner Cities</NavItem>
            <NavDropdown eventKey={2} title="EcoCompass" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Action</MenuItem>
              <MenuItem eventKey={2.2}>Another action</MenuItem>
              <MenuItem eventKey={2.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavItem eventKey={3} href="#">About</NavItem>
            <NavItem eventKey={4} href="#">Help</NavItem>
            <NavItem eventKey={5} href="#">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default AppHeader
