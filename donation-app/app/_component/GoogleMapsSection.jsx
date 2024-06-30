import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%", // Adjust width and height as needed
  height: "80vh",
  borderRadius: 15,
};

function GoogleMaps({ coordinates }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY, // Load API key from environment variable
  });

  const [center, setCenter] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });

  useEffect(() => {
    coordinates && setCenter(coordinates);
  }, [coordinates]);

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
