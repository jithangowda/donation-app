"use client";
import { supabase } from "@/utils/supabase/client.js";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_component/Slider.jsx";
import Details from "../_component/Details.jsx";

function ViewListing({ params }) {
  const [listingDetail, setListingDetail] = useState();
  useEffect(() => {
    GetListingDetail();
  }, []);

  const GetListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("id", params.id)
      .eq("active", true);

    if (data) {
      setListingDetail(data[0]);
      console.log(data);
    }
    if (error) {
      console.error("Error fetching data:", error.message);
      // Example of handling errors with toast notifications
      toast.error("Server Side Error", {
        duration: 5000,
        style: {
          background: "#E3342F",
        },
      });
    }
  };
  return (
    <div className="p-4 px-32 my-4">
      <Slider imageList={listingDetail?.listingImages} />
      <Details listingDetail={listingDetail} />
    </div>
  );
}

export default ViewListing;
