"use client"; // Enable Supabase client-side functionality
import React, { useEffect, useState } from "react"; // React imports
import Listing from "./Listing.jsx"; // Listing component
import { supabase } from "@/utils/supabase/client.js"; // Supabase client instance
import { format } from "date-fns"; // Date formatting function
import GoogleMapsSection from "./GoogleMapsSection.jsx"; // Google Maps section component

function ListingMapView() {
  // State variables to hold listings, filters, and other UI-related states
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState(null);
  const [filterDonationType, setFilterDonationType] = useState(null);
  const [filterOrganizerType, setFilterOrganizerType] = useState(null);
  const [filterDonationNeeds, setFilterDonationNeeds] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  // Fetch the latest listings whenever any filter changes
  useEffect(() => {
    getLatestListing();
  }, [
    filterDonationType,
    filterOrganizerType,
    filterDonationNeeds,
    filterDate,
  ]);

  // Function to get the latest listings based on active filters
  const getLatestListing = async () => {
    // Initial query to fetch active listings and related images
    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .order("id", { ascending: false });

    // Apply filters to the query
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

    // Execute the query and handle the response
    const { data, error } = await query;

    if (data) {
      console.log(data);
      setListing(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      // Example of handling errors with toast notifications
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  // Function to handle search click event
  const handleSearchClick = async () => {
    if (!searchedAddress) {
      return; // Do nothing if no address is selected
    }

    setIsSearchClicked(true); // Set search clicked state to true

    const searchTerm = searchedAddress?.label; // Extract search term from selected address
    console.log(searchTerm);
    let query = supabase
      .from("listing")
      .select(`*, listingImages(url, listing_id)`)
      .eq("active", true)
      .ilike("address", `%${searchTerm}%`) // Use ilike for case-insensitive partial match
      .order("id", { ascending: false });

    // Apply filters to the query
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

    // Execute the query and handle the response
    const { data, error } = await query;

    if (data) {
      console.log(data);
      setListing(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      // Example of handling errors with toast notifications
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  // Function to reset all filters and reload the initial listing
  const resetFilters = async () => {
    setIsSearchClicked(false); // Reset search clicked state
    setSearchedAddress(null); // Clear searched address
    setFilterDonationType(null);
    setFilterOrganizerType(null);
    setFilterDonationNeeds(null);
    setFilterDate(null);
    setCoordinates(null);

    // Fetch the initial set of active listings
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
      // Example of handling errors with toast notifications
      toast.error("Server Side Error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };

  // Render the listing map view component
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Listing section */}
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

      {/* Map section */}
      <div className="fixed right-10 w-[46%]">
        <GoogleMapsSection listing={listing} coordinates={coordinates} />
      </div>
    </div>
  );
}

export default ListingMapView;
