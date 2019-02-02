import React from 'react'
import {connect} from 'react-redux'
import {toggleRoad, toggleTown} from '../store'

class MenuSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.handleTownToggle = this.handleTownToggle.bind(this)
    this.handleRoadToggle = this.handleRoadToggle.bind(this)
  }

  handleTownToggle(e) {
    e.preventDefault()
    this.props.toggleTown(e.target.name)
  }

  handleRoadToggle(e, town) {
    e.preventDefault()
    this.props.toggleRoad(town, e.target.name)
  }

  render() {
    const {menu} = this.props
    const townNames = Object.keys(menu)
    const townCheckboxes = townNames.map(name => 
      <label>
        <input
          name={name}
          type="checkbox"
          checked={menu[name].selected}
          onChange={this.handleTownToggle} 
        />
        {name}
      </label>
      
    )

    const roadCheckboxes = Object.keys(menu).reduce( (checkboxes, town) => {
      if (menu[town].selected) {
        Object.keys(menu[town].roads).forEach(road => {
          checkboxes.push(
            <label>
              <input
                name={road}
                town={town}
                type="checkbox"
                checked={menu[town].roads[road].selected}
                onChange={e => this.handleRoadToggle(e, town)} 
              />
              {road}
            </label>
          )
        })
      }
      return checkboxes
    }, [])

    return (
      <div id='menu-sidebar'>
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
  toggleRoad, toggleTown
}

export default connect(mapState, mapDispatch)(MenuSidebar)