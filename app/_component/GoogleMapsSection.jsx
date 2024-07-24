import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapMarkerItems from "./MapMarkerItems.jsx";

// Base styling for the map container
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px", // Rounded corners with unit
  borderRadius: "0.75rem", // Rounded corners with Tailwind's rounded-xl equivalent
  overflow: "hidden", // Ensures no overflow is visible
};

// Styling for the inner map container
const innerMapContainerStyle = {
  width: "100%",
  height: "100%",
};

function GoogleMaps({ coordinates, listing }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
  });

  const [center, setCenter] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });

  const [mapHeight, setMapHeight] = useState("80vh");

  useEffect(() => {
    coordinates && setCenter(coordinates);

    const handleResize = () => {
      setMapHeight(window.innerWidth < 768 ? "50vh" : "80vh");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [coordinates]);

  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ ...mapContainerStyle, height: mapHeight }}>
      <div style={innerMapContainerStyle}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={13}
          center={center}
        >
          {listing.map((item, index) => (
            <MapMarkerItems key={index} item={item} />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default GoogleMaps;
