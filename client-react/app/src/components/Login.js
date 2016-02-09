import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class LoginModal extends React.Component {
  constructor(){
    super();
    this.state = {
      showModal: true
    }
    this.close = this.close.bind(this);
  }
  close(){
    this.setState({'showModal': !this.state.showModal});
  }
  render(){

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please Login</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default LoginModal
