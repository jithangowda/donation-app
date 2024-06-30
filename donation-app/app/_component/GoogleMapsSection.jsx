import React from "react";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "400px", // Adjust width and height as needed
  height: "400px",
};

const center = {
  lat: 12.9716, // Replace with your desired latitude
  lng: 77.5946, // Replace with your desired longitude
};

// Set your preferred initial zoom level

function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY, // Load API key from environment variable
  });

  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={mapContainerStyle}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        {/* Add markers, info windows, custom controls, etc. here */}
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;
