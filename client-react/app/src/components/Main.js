import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './Login';
import GLMap from './GLMap';
import AppHeader from './AppHeader';
import Dashboard from './Dashboard';
// import mapboxgl from 'mapbox-gl'
// var MapGL = require('react-map-gl');
// import scriptLoader from 'script-loader';
// import 'babel-core/polyfill';

// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl'
// require("script!mapbox-gl/dist/mapbox-gl.js");

// update(e){
//   let code = e.target.value;
//   try {
//     this.setState({
//       output: babel.transform(code, {
//         stage: 0,
//         loose: 'all'
//       }).code,
//       err: ''
//     })
//   } catch(err) {
//     this.setState({err: err.message})
//   }
// }
    // this.update = this.update.bind(this);
class Main extends React.Component {
  constructor(){
    super();
    // this.state = {
    //   mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
    //   mapView: {
    //     container: 'map',
    //     style: 'mapbox://styles/thissaysnothing/cijever1v00098xm3zso2fvk7',
    //     center: [19.2500, 47.4333],
    //     zoom: 15
    //   },
    // };
  }
  render(){
    return (
      <div>
        <LoginModal/>
        <AppHeader/>
        <GLMap />
      </div>
    )
  }
}

    //<Dashboard/>

        // render(){
        //   return (
        //     <div>
        //     <header>
        //       <img id="header-logo" src="./urbinsight_logo_v1.png"></img>
        //       <nav id="header-nav">
        //         <a className="header-nav-option" href="./partnerCities">Partner Cities</a>
        //         <a className="header-nav-option" href="./">EcoCompass</a>
        //         <a className="header-nav-option" href="./">About</a>
        //         <a className="header-nav-option" href="./">Help</a>
        //         <a className="header-nav-option" href="./">Login</a>
        //       </nav>
        //     </header>
        //     <div className="container">
        //       {this.props.children}
        //     </div>
        //     </div>
        //   )
        // }

// AppHeader.propTypes = {
//   addSteps: React.PropTypes.func.isRequired
// }
export default Main
