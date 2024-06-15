import React from 'react'
import Header from './_component/Header'

function Provider({children}) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default Provider