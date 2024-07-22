"use client";
import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { PiMapPinLineDuotone } from "react-icons/pi";

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  const [address, setAddress] = useState(null); // State to store selected address
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to update isMobile state
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the placeholder text based on screen size
  const placeholder = isMobile ? "Address . . ." : "Search Address . . .";

  return (
    <div className="flex items-center w-full">
      <PiMapPinLineDuotone className="h-10 w-10 rounded-l-xl text-primary bg-map-bg" />

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          value: address,
          placeholder, // Use the dynamically determined placeholder
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            setAddress(place);

            if (place) {
              selectedAddress(place);

              geocodeByAddress(place.label)
                .then((result) => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  setCoordinates({ lat, lng });
                });
            } else {
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
