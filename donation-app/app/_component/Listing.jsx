import { format } from "date-fns"; // Date formatting function
import {
  Building,
  CalendarDays,
  HandHelping,
  MapPin,
  PencilRuler,
  RectangleEllipsis,
  Search,
  Shirt,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react"; // Lucide icons
import Image from "next/image.js"; // Image component from Next.js
import React, { useState } from "react"; // React imports
import GoogleAddressSearch from "./GoogleAddressSearch.jsx"; // Google address search component
import { Button } from "@/components/ui/button.jsx"; // Button component
import FilterSection from "./FilterSection.jsx"; // Filter section component

function Listing({
  listing, // List of listings to display
  handleSearchClick, // Function to handle search button click
  searchedAddress, // Function to handle searched address
  setFilterDonationType, // Function to set donation type filter
  setFilterOrganizerType, // Function to set organizer type filter
  setFilterDonationNeeds, // Function to set donation needs filter
  setFilterDate, // Function to set date filter
  resetFilters, // Function to reset filters
  isSearchClicked, // Boolean indicating if search has been clicked
  setCoordinates, // Function to set coordinates
}) {
  const [address, setAddress] = useState(); // State for address

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

  // Render the listing component
  return (
    <div>
      {/* Search and filter section */}
      <div className="p-3 flex flex-col sm:flex-row gap-6 sm:gap-3">
        {/* Google address search component */}
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates}
        />
        {/* Button to trigger search */}
        <Button onClick={handleSearchClick} className="flex gap-2 rounded-xl">
          <Search className="h-5 w-5 " />
          <h2 className="mt-1">Search</h2>
        </Button>
      </div>

      {/* Filter section */}
      <FilterSection
        setFilterDonationType={setFilterDonationType}
        setFilterOrganizerType={setFilterOrganizerType}
        setFilterDonationNeeds={setFilterDonationNeeds}
        setFilterDate={setFilterDate}
        resetFilters={resetFilters}
      />

      {/* Display search result */}
      {isSearchClicked && address && (
        <div className="px-3 mb-2">
          <h2 className="text-lg">
            Found <span className="font-bold">{listing?.length}</span> Result in{" "}
            <span className="text-primary font-bold">{address?.label}</span>
          </h2>
        </div>
      )}

      {/* Grid for listing items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Render each listing item */}
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col h-full hover:border-3 hover:border-primary border-2 cursor-pointer rounded-xl p-2"
              >
                {/* Display listing image */}
                <Image
                  src={item.listingImages[0].url}
                  width={800}
                  height={150}
                  className="rounded-xl object-cover h-[170px]"
                />
                <div className="flex flex-col m-2 gap-2 flex-grow">
                  {/* Display donation type */}
                  <div
                    className={`rounded-xl w-fit p-2 ${
                      item.donationType === "Donation Offer"
                        ? "bg-[#2196F3]"
                        : "bg-[#FF9800]"
                    }`}
                  >
                    <h2 className="font-semibold">{item.donationType}</h2>
                  </div>

                  {/* Display address */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-grow">{item.address}</span>
                  </h2>

                  {/* Display drive name */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <RectangleEllipsis
                      size={20}
                      strokeWidth={2}
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="flex-grow">{item.driveName}</span>
                  </h2>

                  {/* Display date range */}
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

                  {/* Display organizer type and donation needs */}
                  <div className="mt-auto grid grid-rows gap-2">
                    {/* Organizer type */}
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center whitespace-nowrap">
                      {getOrganizerIcon(item.organizerType)}
                      <span>{item.organizerType}</span>
                    </h2>

                    {/* Donation needs */}
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center whitespace-nowrap">
                      {getNeedsIcon(item.donationNeeds)}
                      <span>{item.donationNeeds}</span>
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : // Placeholder elements for loading animation
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
