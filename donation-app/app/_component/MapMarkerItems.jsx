import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import MarkerInfobox from "./MarkerInfobox.jsx";

function MapMarkerItems({ item }) {
  const [selectedListing, setSelectedListing] = useState(null);

  const handleMarkerClick = () => {
    setSelectedListing((prev) => (prev === item ? null : item));
  };

  return (
    <div>
      <MarkerF
        position={item.coordinates}
        onClick={handleMarkerClick}
        icon={{
          url: "/pin.svg",
          scaledSize: {
            width: 45,
            height: 45,
          },
        }}
      >
        {selectedListing && (
          <OverlayView
            position={selectedListing.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarkerInfobox item={selectedListing} />
            </div>
          </OverlayView>
        )}
      </MarkerF>
    </div>
  );
}

export default MapMarkerItems;
