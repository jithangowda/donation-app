"use client";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { RiMapPinAddFill } from "react-icons/ri";
import { PiMapPinLineDuotone } from "react-icons/pi";

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  const [address, setAddress] = useState(null);

  return (
    <div className="flex items-center w-full">
      <PiMapPinLineDuotone className="h-10 w-10 rounded-l-xl text-primary bg-map-bg" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          value: address,
          placeholder: "Search Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            setAddress(place);
            if (place) {
              selectedAddress(place);

              // get latitude and longitude
              geocodeByAddress(place.label)
                .then((result) => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  setCoordinates({ lat, lng });
                });
            } else {
              // Clear the coordinates when the address is cleared
              selectedAddress(null);
              setCoordinates(null);
            }
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
