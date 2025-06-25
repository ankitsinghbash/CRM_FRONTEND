import React from 'react'

import Header from './Header'
function MasterHeader({theme,toggleTheme}) {
  return (
    <div className={`${theme}`}>
        <Header theme={theme} toggleTheme={toggleTheme} />        
    </div>
   
  )
}

export default MasterHeader