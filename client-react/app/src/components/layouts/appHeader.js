import React from 'react';
import GLMap from './GLMap';
import LoginModal from '../Login';
import classNames from 'classnames';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
class AppHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      LoginModalOpened: true
    }
  }
  componentDidMount(){
    // this.props.addSteps([
    //   {
    //     title: 'Login',
    //     text: 'Please Start '
    //   }
    // ])
  }
  statusChange(status){
    this.setState({
      LoginModalOpened: status
    })
  }
  handleClick(){
    let newState = !this.state.LoginModalOpened
    this.setState({
      LoginModalOpened: newState
    })
  }
  render(){
    return (
      <div>
        <Navbar inverse fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><img id="header-logo" src="./app/images/urbinsight_logo_v1.png"></img></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="Explore Data" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1} href="/medellin">Medellin</MenuItem>
                <MenuItem eventKey={1.2} href="/cusco">Cusco</MenuItem>
                <MenuItem eventKey={1.3} href="/abudhabi">Abu Dhabi</MenuItem>
                <MenuItem eventKey={1.3} href="/lima">Lima</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={2} title="Partner Cities" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} href="http://medellin.urbinsight.com">Medellin</MenuItem>
                <MenuItem eventKey={2.2} href="http://cusco.urbinsight.com">Cusco</MenuItem>
                <MenuItem eventKey={2.3} href="http://abudhabi.urbinsight.com">Abu Dhabi</MenuItem>
                <MenuItem eventKey={2.3} href="http://lima.urbinsight.com">Lima</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href="http://wiki.urbinsight.com">Wiki</NavItem>
              <NavItem eventKey={4} href="#">About</NavItem>
              <NavItem eventKey={5} href="#">Help</NavItem>
              <NavItem eventKey={6} href="#" onClick={this.handleClick.bind(this)}>Login</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal modalStatus={this.state.LoginModalOpened} statusChange={this.statusChange.bind(this)}/>
      </div>
    )
  }
}

export default AppHeader
