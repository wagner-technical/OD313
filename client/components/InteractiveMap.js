import React from 'react'
import {compose, withProps} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import {connect} from 'react-redux'

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBUTiUdo_iYTcYxzHqmnMIr1ixiRxujN1Q&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `100%`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={7} defaultCenter={{lat: 43.151068, lng: -75.66542}}>
    {props.poles.length &&
      props.poles.map(pole => (
        <Marker
          key={pole.FLOC}
          position={{
            lat: parseFloat(pole.Latitude),
            lng: parseFloat(pole.Longitude)
          }}
        />
      ))}

    {/* <Marker position={{lat: parseFloat(props.poles['9302-L0089-0447-0014-ED00001'].Latitude), lng: parseFloat(props.poles['9302-L0089-0447-0014-ED00001'].Longitude) }} /> */}
  </GoogleMap>
))

class MyFancyComponent extends React.PureComponent {
  render() {
    const activePoles = Object.keys(this.props.menu).reduce(
      (poles, townName) => {
        const town = this.props.menu[townName]
        if (town.selected) {
          Object.keys(town.roads).forEach(roadName => {
            if (town.roads[roadName].selected) {
              // console.log(town.roads[roadName])
              town.roads[roadName].flocs.forEach(floc =>
                poles.push(this.props.poles[floc])
              )
            }
          })
        }
        return poles
      },
      []
    )

    console.log(activePoles)

    return <MyMapComponent poles={activePoles} />
  }
}

const mapState = state => ({
  menu: state.menu,
  poles: state.poles
})

module.exports = connect(mapState)(MyFancyComponent)
