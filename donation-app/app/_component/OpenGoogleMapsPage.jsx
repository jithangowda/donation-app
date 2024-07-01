import { Button } from "@/components/ui/button.jsx";
import { LocateFixed } from "lucide-react";
import React from "react";

function OpenGoogleMapsPage({ address }) {
  const openGoogleMaps = () => {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        "_blank"
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={openGoogleMaps}
        className="w-[50px] rounded-xl flex items-center justify-center bg-[#F4B400]"
      >
        <LocateFixed size={28} />
      </Button>
    </div>
  );
}

export default OpenGoogleMapsPage;
