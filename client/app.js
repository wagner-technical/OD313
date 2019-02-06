import React from 'react'

import {Navbar, MenuSidebar} from './components'
import Routes from './routes'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCheckSquare,
  faSquare,
  faSquareFull,
  faChevronRight,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
  faFolder,
  faFolderOpen,
  faFile,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare)
library.add(faCheckCircle)
library.add(faSquare)
library.add(faChevronDown)
library.add(faChevronRight)
library.add(faPlusSquare)
library.add(faMinusSquare)
library.add(faFolder)
library.add(faFolderOpen)
library.add(faFile)
library.add(faSquareFull)

const App = () => {
  return (
    <div id="app">
      <div id="map-container">
        <Routes />
      </div>
      <div id="sidebar-container">
        <Navbar />
        <MenuSidebar />
      </div>
    </div>
  )
}

export default App
