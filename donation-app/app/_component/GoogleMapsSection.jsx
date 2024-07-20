import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api"; // Imports for Google Maps components
import MapMarkerItems from "./MapMarkerItems.jsx";

// Styling for the map container
const mapContainerStyle = {
  width: "100%", // Adjust width as needed
  height: "80vh", // Adjust height as needed
  borderRadius: 15, // Rounded corners for map container
};

function GoogleMaps({ coordinates, listing }) {
  // Load Google Maps script and check loading status
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY, // API key from environment variable
  });

  // State for map center coordinates
  const [center, setCenter] = useState({
    lat: 12.9716, // Default latitude (Bangalore)
    lng: 77.5946, // Default longitude (Bangalore)
  });

  // Update center coordinates when 'coordinates' prop changes
  useEffect(() => {
    coordinates && setCenter(coordinates);
  }, [coordinates]);

  // Render loading or error message while Google Maps is loading
  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return <div>Loading...</div>;

  // Render the Google Map component once loaded
  return (
    <div style={mapContainerStyle}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13} // Initial zoom level
        center={center} // Center coordinates of the map
      >
        {/* Add markers, info windows, custom controls, etc. here */}
        {listing.map((item, index) => (
          <MapMarkerItems key={index} item={item} />
        ))}
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;
