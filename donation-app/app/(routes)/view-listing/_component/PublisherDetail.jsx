import { Button } from "@/components/ui/button.jsx";
import { Butterfly_Kids } from "next/font/google/index.js";
import Image from "next/image.js";
import React from "react";

function PublisherDetail({ listingDetail }) {
  return (
    <div className="flex gap-5 items-center justify-between p-3 rounded-xl shadow-md border">
      <div className="flex items-center gap-6">
        <Image
          src={listingDetail?.profileImage}
          alt="profile image"
          width={60}
          height={60}
          className="rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold">{listingDetail?.userName}</h2>
          <h2 className="text-gray-500">{listingDetail?.created_by}</h2>
        </div>
      </div>
      <Button className="rounded-xl">Send Message</Button>
    </div>
  );
}

export default PublisherDetail;
