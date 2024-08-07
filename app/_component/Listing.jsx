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
import OpenGoogleMapsPage from "./OpenGoogleMapsPage.jsx";
import Link from "next/link.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleMapCard from "./GoogleMapCard.jsx";

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
  coordinates,
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
      <div className="pb-3 flex flex-col-2 md:flex-row md:gap-3 gap-2 items-center">
        {/* Google address search component */}
        <div className="flex-grow md:w-[calc(100%-120px)]">
          <GoogleAddressSearch
            selectedAddress={(v) => {
              searchedAddress(v);
              setAddress(v);
            }}
            setCoordinates={setCoordinates}
            className="w-full"
          />
        </div>
        {/* Button to trigger search */}
        <div className="flex-shrink-0 md:w-[118px] ">
          <Button
            onClick={handleSearchClick}
            className="flex items-center gap-2 rounded-xl w-full"
          >
            <Search className="h-5 w-5" />
            <h2 className="mt-1 hidden md:block">Search</h2>
          </Button>
        </div>
      </div>

      {/* Filter section */}
      <FilterSection
        setFilterDonationType={setFilterDonationType}
        setFilterOrganizerType={setFilterOrganizerType}
        setFilterDonationNeeds={setFilterDonationNeeds}
        setFilterDate={setFilterDate}
        resetFilters={resetFilters}
        handleSearchClick={handleSearchClick}
        coordinates={coordinates}
        listing={listing}
      />

      {/* google map card for mobile view */}
      <div className="block md:hidden my-3">
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-0">
            <GoogleMapCard listing={listing} coordinates={coordinates} />
          </CardContent>
        </Card>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4">
        {/* Render each listing item */}
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <Link href={"/view-listing/" + item.id}>
                <div
                  key={index}
                  className="flex flex-col h-full hover:border-3 hover:border-primary border-2 cursor-pointer rounded-xl p-1.5"
                >
                  {/* Display listing image */}
                  <Image
                    src={item?.listingImages[0]?.url}
                    width={800}
                    height={150}
                    alt="listing image"
                    className="rounded-xl object-cover h-[170px]"
                  />
                  <div className="flex flex-col m-2 gap-2 flex-grow">
                    {/* Display donation type "bg-[#2196F3]" "bg-[#FF9800]" */}
                    <div className="flex justify-between gap-2">
                      <div
                        className={`rounded-xl  p-2  ${
                          item.donationType === "Donation Offer"
                            ? "bg-[#A0D6E8]"
                            : "bg-[#FBCEB1]"
                        }`}
                      >
                        <h2 className="font-semibold text-sm">
                          {item.donationType}
                        </h2>
                      </div>
                      <div>
                        <OpenGoogleMapsPage address={item.address} />
                      </div>
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
                        {formatDate(item.startDate)} to{" "}
                        {formatDate(item.endDate)}
                      </span>
                    </h2>

                    {/* Display organizer type and donation needs */}
                    <div className="mt-auto grid grid-rows gap-2">
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
                </div>
              </Link>
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
