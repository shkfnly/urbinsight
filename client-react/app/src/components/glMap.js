import React from 'react';
import Dashboard from './Dashboard';
class GLMap extends React.Component {
  constructor(){
    super();
    this.state = {
      //mapStyle: {
        // position: 'relative',
      //  top:15,
      //  bottom:0,
      //  width: '100%'
      //},
      mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
      mapView: {
        container: 'map',
        style: 'mapbox://styles/thissaysnothing/cijever1v00098xm3zso2fvk7',
        center: [19.2500, 47.4333],
        zoom: 15
    },
  }
}
  render(){
    // style={this.mapStyle}
    if(this.state.map){
    this.state.map.on('style.load', function() {
      this.state.map.addSource("lots", {
        "type": "vector",
        "tiles": ["http://localhost:5001/data/city/lots/budapest/{z}/{x}/{y}.mvt"],
      });
      this.state.map.addLayer({
        "id": "lots",
        "type": "fill",
        "source": "lots",
        "source-layer": "parcels",
        "layout": {
        "visibility": "visible"
        },
        "interactive": true,
        "paint": {
        "fill-color": '#ff0000',
        "fill-opacity": 0.5
        }
      });
    }.bind(this));
    this.state.map.addControl(new mapboxgl.Navigation());
  }
    return (
        <div id='mapContainer'>
          <div id='map'>
            <Dashboard/>
          </div>
        </div>
    )
  }
  //<Dashboard />
  componentDidMount(){
    mapboxgl.accessToken = this.state.mapToken;
    this.setState({map: new mapboxgl.Map(this.state.mapView)});

  }
  componentWillUnmount(){
    this.map.remove();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode());
  }
}

// GLMap.propTypes = {
//     view: React.PropTypes.object,
//     token: React.PropTypes.string
// }

export default GLMap
