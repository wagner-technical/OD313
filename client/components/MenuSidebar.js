import React from 'react'
import {connect} from 'react-redux'
import {toggleRoad, toggleTown, generateOD313} from '../store'
import {Checkbox} from './index'

class MenuSidebar extends React.Component {
  constructor(props) {
    super(props)
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
        checked={menu[name].selected}
        onChange={this.handleTownToggle}
      />
    ))

    const roadCheckboxes = Object.keys(menu).reduce((checkboxes, town) => {
      if (menu[town].selected) {
        Object.keys(menu[town].roads).forEach(road => {
          checkboxes.push(
            <Checkbox
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

    return (
      <div id="menu-sidebar">
        <button onClick={this.props.generateOD313}>
          Generate OD313
        </button>
        <h3>Towns:</h3>
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
