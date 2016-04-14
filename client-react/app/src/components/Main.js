import React from 'react';
import AppHeader from './layouts/AppHeader';

class Main extends React.Component {
  render(){
    return (
      <div>
        <AppHeader/>
        {/*<LoginModal/>*/}
        {this.props.children}
      </div>
    )
  }
}

export default Main
