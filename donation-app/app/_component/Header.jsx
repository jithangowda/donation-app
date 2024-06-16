"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const pathname = usePathname();

  const {user, isSignedIn} = useUser();

  useEffect(()=>{
    console.log(pathname)
  },[])

  return (
    <div className='p-4 px-5 flex justify-between shadow-sm fixed top-0 w-full z-50 bg-white'>
      <div className='flex gap-10 item-center'>
        <Image src={'/logo.svg'} width={150} height={150} alt='logo'/>
        <ul className='hidden md:flex gap-10 py-4'>
          <Link href={'/'}>
            <li className={`'hover:text-primary font-medium text-sm cursor-pointer'
                            ${pathname == '/' && 'text-primary'}`}>
            Link 1
            </li>
          </Link>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Link 2</li>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Link 2</li>
        </ul>
      </div>
      <div className='flex gap-2 py-1 items-center'>
        <Button className='flex gap-2'><Plus/>Post your listing</Button>

        {isSignedIn ? <UserButton/> : <Button variant='outline'>Login</Button>}
        
      </div>
    </div>
  )
}

export default Header