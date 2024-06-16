import React from 'react'
import Header from './_component/Header'

function Provider({children}) {
  return (
    <div>
        <Header/>
        <div className='mt-20'>
          {children}
        </div>
        
    </div>
  )
}

export default Provider