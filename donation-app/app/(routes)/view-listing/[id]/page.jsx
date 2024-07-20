"use client";
import { supabase } from "@/utils/supabase/client.js";
import React, { useEffect } from "react";

function ViewListing({ params }) {
  useEffect(() => {
    GetListingDetail();
  }, []);

  const GetListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id")
      .eq("id", params.id);

    if (data) {
      console.log(data);
    }
  };
  return <div>page</div>;
}

export default ViewListing;
