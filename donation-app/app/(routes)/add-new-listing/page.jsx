import GoogleAddressSearch from '@/app/_component/GoogleAddressSearch.jsx'
import { Button } from '@/components/ui/button.jsx'
import React from 'react'



function AddNewListing() {
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 h-full flex flex-col gap-5 items-center justify-center '>
          <h2 className='font-bold text-2xl text-center '>Add New Listing</h2>
          <div className='p-5 xl:px-28 w-full  rounded-xl border shadow-md flex flex-col gap-5'>
            <h2 className='text-gray-500 text-center'>Enter Address which you want to list</h2>
            <GoogleAddressSearch/>
            <Button className='rounded-full'>Next</Button>
          </div>
      </div>
    </div>
  )
}

export default AddNewListing