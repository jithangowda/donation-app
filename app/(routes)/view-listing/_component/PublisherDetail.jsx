import { Button } from "@/components/ui/button.jsx";
import { Share } from "lucide-react";
import Image from "next/image.js";
import React, { useCallback } from "react";

function PublisherDetail({ listingDetail }) {
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this listing",
          text: `Take a look at this listing by ${listingDetail?.userName}`,
          url: window.location.href, // You can replace this with the listing URL
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  }, [listingDetail]);

  return (
    <div>
      {/* pc vie */}
      <div className="hidden md:block">
        <div className="flex gap-5 items-center justify-between p-3 rounded-xl shadow-md border ">
          <div className="flex items-center gap-6">
            <Image
              src={listingDetail?.profileImage}
              alt="profile image"
              width={60}
              height={60}
              className="rounded-full"
            />

            <div>
              <h2 className="text-lg font-semibold">
                {listingDetail?.userName}
              </h2>
              <h2 className="text-gray-500">{listingDetail?.created_by}</h2>
            </div>
          </div>
          <Button
            className="rounded-xl flex items-center gap-2"
            onClick={handleShare}
          >
            <Share style={{ width: "20px", height: "20px" }} />
            Share
          </Button>
        </div>
      </div>

      {/* mobile view */}
      <div className="block md:hidden">
        <div className="p-3 rounded-xl shadow-md border">
          <div className="flex items-center gap-4">
            <Image
              src={listingDetail?.profileImage}
              alt="profile image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h2 className="text-base font-semibold">
                {listingDetail?.userName}
              </h2>
              <h2 className="text-sm text-gray-500">
                {listingDetail?.created_by}
              </h2>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              className="rounded-xl flex items-center gap-2"
              onClick={handleShare}
            >
              <Share style={{ width: "20px", height: "20px" }} />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublisherDetail;
