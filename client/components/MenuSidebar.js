import React from 'react'
import {connect} from 'react-redux'
import {
  toggleRoad,
  toggleTown,
  generateOD313
} from '../store'
import {Checkbox} from './index'

class MenuSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [],
      expanded: []
    }
    this.handleTownToggle = this.handleTownToggle.bind(this)
    this.handleRoadToggle = this.handleRoadToggle.bind(this)
  }

  handleTownToggle(name) {
    this.props.toggleTown(name)
  }

  handleRoadToggle(name, town) {
    this.props.toggleRoad(town, name)
  }

  render() {
    const {menu} = this.props
    const townNames = Object.keys(menu)
    const townCheckboxes = townNames.map(name => (
      <Checkbox
        name={name}
        key={name}
        checked={menu[name].selected}
        onChange={this.handleTownToggle}
      />
    ))

    const roadCheckboxes = Object.keys(menu).reduce((checkboxes, town) => {
      if (menu[town].selected) {
        Object.keys(menu[town].roads).forEach(road => {
          checkboxes.push(
            <Checkbox
              key={road}
              name={road}
              town={town}
              checked={menu[town].roads[road].selected}
              onChange={e => this.handleRoadToggle(e, town)}
            />
          )
        })
      }
      return checkboxes
    }, [])

    let selectedAmount = 0
    Object.keys(menu).forEach(townName => {
      if (menu[townName].selected) {
        const roads = menu[townName].roads
        Object.keys(roads).forEach(roadName => {
          const amountOfPoles = Object.keys(roads[roadName].flocs).length
          if (roads[roadName].selected) selectedAmount += amountOfPoles
        })
      }
    })

    const disableButton = !selectedAmount || selectedAmount > 150

    return (
      <div id="menu-sidebar">
        <button onClick={this.props.generateOD313} disabled={disableButton}>
          Generate OD313
        </button>
        <div id='menu-header'>
          <div style={{fontSize: 22}}>Towns:</div>
          {selectedAmount 
            ? <div className={selectedAmount > 150 && 'red'}>Poles: {selectedAmount}</div>
            : <div></div>
          }
        </div>
        {townCheckboxes}
        <h4>Roads:</h4>
        {roadCheckboxes}
      </div>
    )
  }
}

const mapState = state => ({
  menu: state.menu
})

const mapDispatch = {
  toggleRoad,
  toggleTown,
  generateOD313
}

export default connect(mapState, mapDispatch)(MenuSidebar)
