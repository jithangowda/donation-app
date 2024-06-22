"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Plus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Header() {
  const pathname = usePathname();

  const {user, isSignedIn} = useUser();

  useEffect(()=>{
    console.log(pathname)
  },[])

  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }
  
  return (
    <div className="mx-auto flex  w-full max-w-7xl justify-between px-4 py-5 text-sm z-10">

        <section ref={animationParent} className="flex items-center gap-10 ">  
            <Image src={'/logo.svg'} alt='logo' width={170} height={170}/>
            {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
            <div className="hidden md:flex items-center gap-4 transition-all">
                <Link href={'/'} className="relative group  px-2 py-3 transition-all ">
                    <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                        <span>Home</span>
                        {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                    </p>
                </Link>

                <Link href={'/'} className="relative group  px-2 py-3 transition-all ">
                    <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                        <span>About us</span>
                        {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                    </p>
                </Link>

                <Link href={'/'} className="relative group  px-2 py-3 transition-all ">
                    <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                        <span>Contact us</span>
                        {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                    </p>
                </Link>
            </div>
        </section>

        <section className=" hidden md:flex items-center gap-8 ">
            <Button className='flex rounded-xl gap-2'><PlusIcon className='h-5 w-5'/>Post your listing</Button>
            
            {isSignedIn ? <UserButton/> : <Link href={'/sign-in'}>
                <Button variant="outline" className="rounded-full border-gray bg-gray-50">Login</Button>
            </Link>}
            
        </section>

        <FiMenu onClick={openSideMenu} className="cursor-pointer text-4xl md:hidden"/>
        
        
    </div>

    
  )
}

//mobile view for navbar
function MobileNav({ closeSideMenu }) {
  const {user, isSignedIn} = useUser();
  const pathname = usePathname();

  useEffect(()=>{
    console.log(pathname)
  },[])

  return (
      <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden z-30">
          <div className=" h-full w-[65%] bg-white px-4 py-4">
              <section className="flex justify-end">
                  <AiOutlineClose onClick={closeSideMenu} className="cursor-pointer text-4xl "/>
              </section>

              <div className="flex flex-col gap-4 transition-all">
              <Link href={'/'} onClick={closeSideMenu} className="relative group  px-2 py-3 transition-all ">
                  <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                      <span>Home</span>
                      {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                  </p>
              </Link>

              <Link href={'/'} className="relative group  px-2 py-3 transition-all ">
                  <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                      <span>About us</span>
                      {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                  </p>
              </Link>

              <Link href={'/'} className="relative group  px-2 py-3 transition-all ">
                  <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                      <span>Contacts</span>
                      {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
                  </p>
              </Link>
          </div>

          <section className="flex flex-col items-center gap-8 mt-4 ">
              <Button className='flex rounded-xl gap-2 w-full'><PlusIcon className='h-5 w-5'/>Post your listing</Button>

              {isSignedIn ? <UserButton/> : <Link href={'/sign-in'}>
                <Button variant="outline" className="rounded-full border-gray bg-gray-50" onClick={closeSideMenu} >Login</Button>
            </Link>}
          
          </section>

          </div>

      </div>
  )
}

export default Header

/*<div className='p-3 px-5 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
      <div className='flex gap-12 item-center'>
        <Image src={'/logo.svg'} width={150} height={150} alt='logo'/>
        <ul className='hidden md:flex gap-10 py-4'>
          <Link href={'/'}>
            <li className={`'hover:text-primary font-medium text-sm cursor-pointer'
                            ${pathname == '/' && 'text-primary'}`}>
            Link 1
            </li>
          </Link>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Link 2</li>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Link 3</li>
        </ul>
      </div>
      <div className='flex gap-2 py-1 items-center'>
        <Link href={'/add-new-listing'}>
          <Button className='flex gap-2'><Plus/>Post your listing</Button>
        </Link>
        
        {isSignedIn ? <UserButton/> : <Link href={'/sign-in'}><Button variant='outline'>Login</Button></Link>}
        
      </div>
    </div>*/