"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing.jsx";
import { supabase } from "@/utils/supabase/client.js";

function ListingMapView() {
  const [listing, setListing] = useState();

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*,listingImages(
        url,listing_id)`
      )
      .eq("active", true)
      .order("id", { ascending: false });

    if (data) {
      console.log(data);
      setListing(data);
    }
    if (error) {
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
      <div>
        <Listing listing={listing} />
      </div>
      <div>Map</div>
    </div>
  );
}

export default ListingMapView;
