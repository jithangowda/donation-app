"use client";
import { Button } from "@/components/ui/button.jsx";
import { format } from "date-fns";
import {
  Building,
  CalendarDays,
  HandHelping,
  MapPin,
  PencilRuler,
  Share,
  Shirt,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import React from "react";
import PublisherDetail from "./PublisherDetail.jsx";

// Function to format date string
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy");
};

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
      return <UtensilsCrossed size={20} strokeWidth={2} className="h-4 w-4" />;
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

function Details({ listingDetail }) {
  if (!listingDetail) {
    return <div>Loading...</div>; // Display a loading message while the details are being fetched
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
  }&q=${encodeURIComponent(listingDetail.address)}&zoom=13&maptype=roadmap`;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="py-3 px-0 bg-white">
        <div>
          {/* Display donation type and buttons */}
          <div className="flex justify-between items-center mb-4">
            <div
              className={`rounded-xl p-2 ${
                listingDetail.donationType === "Donation Offer"
                  ? "bg-[#A0D6E8]"
                  : "bg-[#FBCEB1]"
              }`}
            >
              <h2 className="font-semibold text-lg md:text-xl">
                {listingDetail.donationType}
              </h2>
            </div>
          </div>
          {/* Display address */}
          <div className="flex items-center gap-2 text-lg md:text-xl text-gray-600">
            <MapPin
              className="flex-shrink-0"
              style={{ width: "26px", height: "26px" }}
              strokeWidth={2}
            />
            <span>{listingDetail.address}</span>
          </div>
          {/* Display date range and organizer type & donation needs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-1">
            <div className="flex items-center gap-2 text-lg md:text-xl text-gray-600">
              <CalendarDays
                style={{ width: "26px", height: "26px" }}
                strokeWidth={2}
                className="flex-shrink-0"
              />
              <span>
                {formatDate(listingDetail.startDate)} to{" "}
                {formatDate(listingDetail.endDate)}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0 w-full md:w-auto">
              {/* Organizer type */}
              <div className="flex items-center justify-center gap-2 text-sm md:text-md bg-[#E6E6FA] rounded-xl p-2 text-gray-700 w-full md:w-auto">
                {getOrganizerIcon(listingDetail.organizerType)}
                <span>{listingDetail.organizerType}</span>
              </div>
              {/* Donation needs */}
              <div className="flex items-center justify-center gap-2 text-sm md:text-md bg-[#E6E6FA] rounded-xl p-2 text-gray-700 w-full md:w-auto">
                {getNeedsIcon(listingDetail.donationNeeds)}
                <span>{listingDetail.donationNeeds}</span>
              </div>
            </div>
          </div>

          {/* Publisher Detail */}
          <div className="my-4">
            <PublisherDetail listingDetail={listingDetail} />
          </div>
          <hr className="my-2" />

          {/* Display drive name and description */}
          <h2 className="flex gap-2 text-lg md:text-xl font-semibold mb-1">
            <span>{listingDetail.driveName}</span>
          </h2>
          <h2 className="text-sm md:text-base font-light text-justify">
            <span>{listingDetail.description}</span>
          </h2>
          <hr className="my-2" />

          {/* Display map */}
          <h2 className="flex gap-2 text-lg md:text-xl font-semibold mb-1">
            <span>Find On Map</span>
          </h2>
          <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={mapUrl}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
