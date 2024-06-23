"use client"
import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { RiMapPinAddFill } from "react-icons/ri";
import { PiMapPinLineDuotone } from "react-icons/pi";

function GoogleAddressSearch() {
  return (
    <div className='flex items-center w-full'>
      
      <PiMapPinLineDuotone className='h-10 w-10 rounded-l-xl text-primary' />
        {/* <MapPin className='h-11 w-10 p-2 rounded-l-lg '/> */}
          <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder:'Search Address',
                isClearable:true,
                className:'w-full ',
                onChange:(place)=>{
                  console.log(place);
                }
              }}
        />
    </div>
  )
}

export default GoogleAddressSearch