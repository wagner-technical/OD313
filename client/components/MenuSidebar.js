import React from 'react'
import {connect} from 'react-redux'
import {toggleRoad, toggleTown, generateOD313} from '../store'
import CheckboxTree from 'react-checkbox-tree'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MenuSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [],
      expanded: [],
    }
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

    const nodes = [{
      value: 'mars',
      label: 'Mars',
      children: [
          { value: 'phobos', label: 'Phobos' },
          { value: 'deimos', label: 'Deimos' },
      ],
    }, {
      value: 'venus',
      label: 'Venus',
      children: [
          { value: 'a', label: 'a' },
          { value: 'b', label: 'b' },
      ],
    }]

    const nodes2 = []

    townNames.forEach(townName => {
      nodes2.push({
        value: townName,
        label: townName,
        children: Object.keys(menu[townName].roads).map(roadName => ({
          value: roadName,
          label: roadName
        }))
      })
    })

    console.log(JSON.stringify(nodes2, undefined, 2))

    console.log(JSON.stringify(nodes, undefined, 2))

    // const townCheckboxes = townNames.map(name => (
    //   <label>
    //     <input
    //       name={name}
    //       type="checkbox"
    //       checked={menu[name].selected}
    //       onChange={this.handleTownToggle}
    //     />
    //     {name}
    //   </label>
    // ))

    // const roadCheckboxes = Object.keys(menu).reduce((checkboxes, town) => {
    //   if (menu[town].selected) {
    //     Object.keys(menu[town].roads).forEach(road => {
    //       checkboxes.push(
    //         <label>
    //           <input
    //             name={road}
    //             town={town}
    //             type="checkbox"
    //             checked={menu[town].roads[road].selected}
    //             onChange={e => this.handleRoadToggle(e, town)}
    //           />
    //           {road}
    //         </label>
    //       )
    //     })
    //   }
    //   return checkboxes
    // }, [])

    return (
      <div id="menu-sidebar">
        <button onClick={this.props.generateOD313}>Generate OD313</button>
        {/* <h3>Towns:</h3>
        {townCheckboxes}
        <h4>Roads:</h4>
        {roadCheckboxes} */}
        <CheckboxTree
          nodes={nodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
          // nativeCheckboxes={true}
          icons={{
            check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
            uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
            halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-circle" />,
            expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
            expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
            expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
            collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
            parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
            parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
            leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
        }}
        />
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
