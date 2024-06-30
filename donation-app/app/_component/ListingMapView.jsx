"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing.jsx";
import { supabase } from "@/utils/supabase/client.js";
import { format } from "date-fns";
import GoogleMapsSection from "./GoogleMapsSection.jsx";

function ListingMapView() {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState(null);
  const [filterDonationType, setFilterDonationType] = useState(null);
  const [filterOrganizerType, setFilterOrganizerType] = useState(null);
  const [filterDonationNeeds, setFilterDonationNeeds] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [coordinates, setCoordinates] = useState(false);

  useEffect(() => {
    getLatestListing();
  }, [
    filterDonationType,
    filterOrganizerType,
    filterDonationNeeds,
    filterDate,
  ]);

  const getLatestListing = async () => {
    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .order("id", { ascending: false });

    if (filterDonationType) {
      query = query.eq("donationType", filterDonationType);
    }
    if (filterOrganizerType) {
      query = query.eq("organizerType", filterOrganizerType);
    }
    if (filterDonationNeeds) {
      query = query.eq("donationNeeds", filterDonationNeeds);
    }
    if (filterDate) {
      const formattedDate = format(new Date(filterDate), "yyyy-MM-dd");
      query = query
        .gte("startDate", formattedDate)
        .lte("endDate", formattedDate);
    }

    const { data, error } = await query;

    if (data) {
      console.log(data);
      setListing(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  const handleSearchClick = async () => {
    if (!searchedAddress) {
      return; // Handle case where no address is selected
    }

    setIsSearchClicked(true); // Set search clicked state to true

    const searchTerm = searchedAddress.label; // Assuming label is where the address text is stored
    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`);

    query = query
      .eq("active", true)
      .like("address", `%${searchTerm}%`)
      .order("id", { ascending: false });

    if (filterDonationType) {
      query = query.eq("donationType", filterDonationType);
    }
    if (filterOrganizerType) {
      query = query.eq("organizerType", filterOrganizerType);
    }
    if (filterDonationNeeds) {
      query = query.eq("donationNeeds", filterDonationNeeds);
    }
    if (filterDate) {
      //format date
      const formattedDate = format(new Date(filterDate), "yyyy-MM-dd");
      query = query
        .gte("startDate", formattedDate)
        .lte("endDate", formattedDate);
    }

    const { data, error } = await query;

    if (data) {
      console.log(data);
      setListing(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  const resetFilters = async () => {
    setIsSearchClicked(false); // Reset search clicked state
    setSearchedAddress(null); // Clear searched address
    setFilterDonationType(null);
    setFilterOrganizerType(null);
    setFilterDonationNeeds(null);
    setFilterDate(null);
    setCoordinates(null);

    const { data, error } = await supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* listing section */}
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchedAddress={setSearchedAddress}
          setFilterDonationType={setFilterDonationType}
          setFilterOrganizerType={setFilterOrganizerType}
          setFilterDonationNeeds={setFilterDonationNeeds}
          setFilterDate={setFilterDate}
          resetFilters={resetFilters}
          isSearchClicked={isSearchClicked}
          setCoordinates={setCoordinates}
        />
      </div>

      {/* map section */}
      <div className="fixed right-10 w-[46%] ">
        <GoogleMapsSection coordinates={coordinates} />
      </div>
    </div>
  );
}

export default ListingMapView;
