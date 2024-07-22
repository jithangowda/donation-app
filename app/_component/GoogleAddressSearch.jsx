"use client";
import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete"; // Import for Google Places Autocomplete
import { RiMapPinAddFill } from "react-icons/ri"; // Icon import for map pin
import { PiMapPinLineDuotone } from "react-icons/pi"; // Icon import for map pin (alternate)

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  const [address, setAddress] = useState(null); // State to store selected address

  // Render the component
  return (
    <div className="flex items-center w-full">
      {/* Display map pin icon */}
      <PiMapPinLineDuotone className="h-10 w-10 rounded-l-xl text-primary bg-map-bg" />

      {/* Google Places Autocomplete component */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY} // API key for Google Places API
        selectProps={{
          value: address, // Current selected address
          placeholder: "Search . . .", // Placeholder text
          isClearable: true, // Allow clearing of selected address
          className: "w-full", // Full-width styling
          onChange: (place) => {
            setAddress(place); // Update selected address state

            // If an address is selected
            if (place) {
              selectedAddress(place); // Callback to parent with selected place

              // Retrieve latitude and longitude from selected address
              geocodeByAddress(place.label)
                .then((result) => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  setCoordinates({ lat, lng }); // Set coordinates in parent component
                });
            } else {
              // Clear the coordinates when the address is cleared
              selectedAddress(null); // Clear selected address in parent
              setCoordinates(null); // Clear coordinates in parent
            }
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
