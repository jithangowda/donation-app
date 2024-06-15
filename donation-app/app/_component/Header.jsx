import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
        <Image src={'/logo.svg'} width={150} height={150} alt='logo'/>
    </div>
  )
}

export default Header