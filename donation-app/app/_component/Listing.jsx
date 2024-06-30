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
  setCoordinates,
}) {
  const [address, setAddress] = useState();

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };

  return (
    <div>
      <div className="p-3 flex flex-col sm:flex-row gap-6 sm:gap-3">
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={setCoordinates}
        />
        <Button onClick={handleSearchClick} className="flex gap-2 rounded-xl">
          <Search className="h-5 w-5 " />
          <h2 className="mt-1">Search</h2>
        </Button>
      </div>

      <FilterSection
        setFilterDonationType={setFilterDonationType}
        setFilterOrganizerType={setFilterOrganizerType}
        setFilterDonationNeeds={setFilterDonationNeeds}
        setFilterDate={setFilterDate}
        resetFilters={resetFilters}
      />

      {isSearchClicked && address && (
        <div className="px-3 mb-2">
          <h2 className="text-lg">
            Found <span className="font-bold">{listing?.length}</span> Result in{" "}
            <span className="text-primary font-bold">{address?.label}</span>
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col h-full hover:border-3 hover:border-primary border-2 cursor-pointer rounded-xl p-2"
              >
                <Image
                  src={item.listingImages[0].url}
                  width={800}
                  height={150}
                  className="rounded-xl object-cover h-[170px]"
                />
                <div className="flex flex-col m-2 gap-2 flex-grow">
                  <div
                    className={`rounded-xl w-fit p-2 ${
                      item.donationType === "Donation Offer"
                        ? "bg-[#2196F3]"
                        : "bg-[#FF9800]"
                    }`}
                  >
                    <h2 className="font-semibold">{item.donationType}</h2>
                  </div>

                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-grow">{item.address}</span>
                  </h2>

                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <RectangleEllipsis
                      size={20}
                      strokeWidth={2}
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="flex-grow">{item.driveName}</span>
                  </h2>

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

                  <div className="mt-auto grid grid-rows gap-2">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center whitespace-nowrap">
                      {getOrganizerIcon(item.organizerType)}
                      <span>{item.organizerType}</span>
                    </h2>

                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center whitespace-nowrap">
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
