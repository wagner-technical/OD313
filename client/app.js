import React from 'react'

import {Navbar, MenuSidebar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id='app'>
      <div id='map-container'>
        <Routes />
      </div>
      <div id='sidebar-container'>
        <Navbar />
        <MenuSidebar />
      </div>
    </div>
  )
}

export default App
