import React from 'react'
import Header from './_component/Header'

function Provider({children}) {
  return (
    <div>
        <Header/>
        <div className='flex justify-center my-22'>
          {children}
        </div>
        
    </div>
  )
}

export default Provider