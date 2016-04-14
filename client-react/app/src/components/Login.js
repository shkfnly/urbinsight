import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';

class LoginModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: props.modalStatus
    }
    this.close = this.close.bind(this);
  }
  close(){
    this.props.statusChange(!this.state.showModal);
  }
  componentWillReceiveProps(props){
    this.setState({showModal: props.modalStatus})
  }
  render(){
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title id="login-modal-title"><img id="header-logo" src="./app/images/urbinsight_logo_v1.png"></img></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type="email" placeholder="Email"/>
              <Input type="password" placeholder="Password" />
            </form>
          </Modal.Body>
          <Modal.Footer id="login-modal-footer">
            <div className="login-button-helper">
              <Button className="auth-buttons" bsStyle="primary" bsSize="large" block>LOGIN</Button>
            </div>
            <div className="login-button-helper">
              <Button className="auth-buttons" bsStyle="success" bsSize="large" block>SIGN UP</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



export default LoginModal
