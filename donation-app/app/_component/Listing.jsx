import { format } from "date-fns";
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
} from "lucide-react";
import Image from "next/image.js";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch.jsx";
import { Button } from "@/components/ui/button.jsx";
import FilterSection from "./FilterSection.jsx";

function Listing({
  listing,
  handleSearchClick,
  searchedAddress,
  setFilterDonationType,
  setFilterOrganizerType,
  setFilterDonationNeeds,
  setFilterDate,
  resetFilters,
  isSearchClicked,
}) {
  const [address, setAddress] = useState();
  // organizer type switch case
  const getOrganizerIcon = (organizerType) => {
    switch (organizerType) {
      case "Individual":
        return <User size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Small Group":
        return <Users size={20} strokeWidth={2} className="h-4 w-4" />;
      case "Registered Organization":
        return <Building size={20} strokeWidth={2} className="h-4 w-4" />;
      default:
        return null; // handle other types or no icon needed
    }
  };

  // organizer type switch case
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
        return null; // handle other types or no icon needed
    }
  };

  //   date format (dd-mm-yyyy)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };
  return (
    <div>
      {/* search bar and filters */}
      <div className="p-3 flex flex-col sm:flex-row gap-6 sm:gap-3">
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={(v) => console.log(v)}
        />
        <Button onClick={handleSearchClick} className="flex gap-2 rounded-xl">
          <Search className="h-5 w-5 " />
          <h2 className="mt-1">Search</h2>
        </Button>
      </div>
      {/* filters */}
      <FilterSection
        setFilterDonationType={setFilterDonationType}
        setFilterOrganizerType={setFilterOrganizerType}
        setFilterDonationNeeds={setFilterDonationNeeds}
        setFilterDate={setFilterDate}
        resetFilters={resetFilters}
      />

      {/* text to show no. of listings available */}
      {isSearchClicked && address && (
        <div className="px-3 mb-2">
          <h2 className="text-lg">
            Found <span className="font-bold">{listing?.length}</span> Result in{" "}
            <span className="text-primary font-bold">{address?.label}</span>
          </h2>
        </div>
      )}

      {/* each listin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <div className="hover:border-3 hover:border-primary border-2 cursor-pointer rounded-xl p-2">
                <Image
                  src={item.listingImages[0].url}
                  width={800}
                  height={150}
                  className="rounded-xl object-cover h-[170px]"
                />
                <div className="flex flex-col m-2 gap-2">
                  {/* dontaion type - offer/request  bg-[#e59ef2]purple*/}
                  <div
                    className={`rounded-xl w-fit p-2 ${
                      item.donationType === "Offer"
                        ? "bg-[#2196F3]"
                        : "bg-[#FF9800]"
                    }`}
                  >
                    <h2 className="font-semibold">{item.donationType}</h2>
                  </div>

                  {/* address */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {item.address}
                  </h2>

                  {/* Drive Name */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <RectangleEllipsis
                      size={20}
                      strokeWidth={2}
                      className="h-4 w-4"
                    />
                    {item.driveName}
                  </h2>

                  {/* time period */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <CalendarDays
                      size={20}
                      strokeWidth={2}
                      className="h-4 w-4"
                    />
                    {formatDate(item.startDate)} to {formatDate(item.endDate)}
                  </h2>

                  {/* filter icons */}
                  <div className="mt-2 grid grid-rows gap-2">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center">
                      {getOrganizerIcon(item.organizerType)}
                      <span>{item.organizerType}</span>
                    </h2>

                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center">
                      {getNeedsIcon(item.donationNeeds)}
                      <span>{item.donationNeeds}</span>
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
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
