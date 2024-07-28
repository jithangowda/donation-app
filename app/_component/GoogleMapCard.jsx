import React from "react";
import GoogleMapsSection from "./GoogleMapsSection.jsx";

function GoogleMapCard({ coordinates, listing }) {
  return (
    <div>
      <GoogleMapsSection
        coordinates={coordinates}
        listing={listing}
        zoom={11}
      />
    </div>
  );
}

export default GoogleMapCard;
