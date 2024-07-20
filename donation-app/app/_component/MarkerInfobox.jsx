import React, { useState, useEffect } from "react";
import Image from "next/image";
import OpenGoogleMapsPage from "./OpenGoogleMapsPage.jsx"; // Import the OpenGoogleMapsPage component
import {
  Building,
  CalendarDays,
  HandHelping,
  MapPin,
  PencilRuler,
  Shirt,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";

function MarkerInfobox({ item }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set timeout to hide the infobox after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10,000 milliseconds = 10 seconds

    // Clear timeout if component is unmounted before 10 seconds
    return () => clearTimeout(timer);
  }, []);

  // Function to get organizer type icon based on type
  const getOrganizerIcon = (organizerType) => {
    switch (organizerType) {
      case "Individual":
        return <User size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Small Group":
        return <Users size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Registered Organization":
        return <Building size={20} strokeWidth={2} className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to get donation needs icon based on type
  const getNeedsIcon = (donationNeeds) => {
    switch (donationNeeds) {
      case "Food":
        return (
          <UtensilsCrossed size={20} strokeWidth={2} className="h-4 w-4" />
        );
      case "Clothes":
        return <Shirt size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Stationary":
        return <PencilRuler size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Financial":
        return <Wallet size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Mixed Donation":
        return <HandHelping size={20} strokeWidth={2} className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to format date string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };

  if (!isVisible) return null; // Render nothing if not visible

  return (
    <div className="bg-white p-3 rounded-xl shadow-lg max-w-xs w-[224px] h-full">
      {/* Display listing image */}
      <div className="relative w-[200px] h-[150px] mb-2">
        <Image
          src={item.listingImages[0].url}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          alt="Listing Image"
        />
      </div>

      <div className="mb-2">
        {/* Display donation type "bg-[#2196F3]" "bg-[#FF9800]" */}
        <div className="flex justify-between gap-2">
          <div
            className={`rounded-xl p-2 ${
              item.donationType === "Donation Offer"
                ? "bg-[#A0D6E8]"
                : "bg-[#FBCEB1]"
            }`}
          >
            <h2 className="font-semibold text-sm">{item.donationType}</h2>
          </div>
          <div>
            <OpenGoogleMapsPage address={item.address} />
          </div>
        </div>
      </div>

      {/* Display address */}
      <div className="mt-2">
        <h2 className="flex gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">{item.address}</span>
        </h2>
      </div>

      {/* Display date range */}
      <div className="mt-2">
        <h2 className="flex gap-2 text-sm text-gray-400">
          <CalendarDays
            size={20}
            strokeWidth={2}
            className="h-4 w-4 flex-shrink-0"
          />
          <span className="flex-grow">
            {formatDate(item.startDate)} to {formatDate(item.endDate)}
          </span>
        </h2>
      </div>

      {/* Display organizer type and donation needs */}
      <div className="mt-2 grid grid-rows gap-2">
        {/* Organizer type */}
        <h2 className="flex w-full gap-2 text-sm bg-[#E6E6FA] rounded-xl p-2 text-gray-700 justify-center items-center whitespace-nowrap">
          {getOrganizerIcon(item.organizerType)}
          <span>{item.organizerType}</span>
        </h2>

        {/* Donation needs */}
        <h2 className="flex w-full gap-2 text-sm bg-[#E6E6FA] rounded-xl p-2 text-gray-700 justify-center items-center whitespace-nowrap">
          {getNeedsIcon(item.donationNeeds)}
          <span>{item.donationNeeds}</span>
        </h2>
      </div>
    </div>
  );
}

export default MarkerInfobox;
