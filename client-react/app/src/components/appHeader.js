import React from 'react';
import GLMap from './GLMap';
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
      <div>
        <header>
          <img id="header-logo" src="./urbinsight_logo_v1.png"></img>
          <nav id="header-nav">
            <a className="header-nav-option" href="./partnerCities">Partner Cities</a>
            <a className="header-nav-option" href="./">EcoCompass</a>
            <a className="header-nav-option" href="./">About</a>
            <a className="header-nav-option" href="./">Help</a>
            <a className="header-nav-option" href="./">Login</a>
          </nav>
        </header>
      </div>
    )
  }
}

export default AppHeader
