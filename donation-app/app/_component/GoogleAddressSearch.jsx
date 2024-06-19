"use client"
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function GoogleAddressSearch() {
  return (
    <div>
        <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        />
    </div>
  )
}

export default GoogleAddressSearch