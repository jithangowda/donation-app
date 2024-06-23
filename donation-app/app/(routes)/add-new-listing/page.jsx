"use client"
import GoogleAddressSearch from '@/app/_component/GoogleAddressSearch.jsx'
import { Button } from '@/components/ui/button.jsx'
import { supabase } from '@/utils/supabase/client.js';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';



function AddNewListing() {
  const [selectedAddress,setSelectedAddress] = useState();
  const [coordinates,setCoordinates] = useState();
  const {user} = useUser();
  const [loader,setLoader] = useState(false);

  const nextHandler=async()=>{
    setLoader(true)
    //supabase
    const { data, error } = await supabase
    .from('listing')
    .insert([
      { address: selectedAddress.label, 
        coordinates: coordinates, 
        created_by: user?.primaryEmailAddress.emailAddress },
    ])
    .select()

    if(data) {
      setLoader(false)
      console.log("New data added",data);
      toast("New Address added for listing")
    }
    if(error) {
      setLoader(false)
      console.log(error);
      toast("Error Occured")
    }
        
  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 h-full flex flex-col gap-5 items-center justify-center '>
          <h2 className='font-bold text-2xl text-center '>Add New Listing</h2>
          <div className='p-5 xl:px-28 w-full  rounded-xl border shadow-md flex flex-col gap-5'>
            <h2 className='text-gray-500 text-center'>Enter Address which you want to list</h2>
            <GoogleAddressSearch
              selectedAddress={(value)=>setSelectedAddress(value)} 
              setCoordinates={(value)=>setCoordinates(value)}  
            />
            <Button 
              disabled = {!selectedAddress || !coordinates || loader}
              onClick={nextHandler}
              className='rounded-full'>
                {loader ? <Loader className='animate-spin'/> : 'Next'}
              </Button>
          </div>
      </div>
    </div>
  )
}

export default AddNewListing