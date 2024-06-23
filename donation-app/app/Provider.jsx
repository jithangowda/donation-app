import React from 'react'
import Header from './_component/Header'


function Provider({children}) {
  return (
    <div>     
        <Header/>
        <div className='overflow-hidden'> 
          {children}
        </div>
        
    </div>
  )
}

export default Provider