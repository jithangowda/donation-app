import { MapPin } from "lucide-react";
import Image from "next/image.js";
import React from "react";

function Listing({ listing }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {listing?.map((item, index) => (
          <div>
            <Image
              src={item.listingImages[0].url}
              width={800}
              height={150}
              className="rounded-xl object-cover h-[150px]"
            />
            <div className="flex flex-col m-2 gap-2">
              {/* dontaion type - offer/request */}
              <h2 className="font-bold text-xl">{item.donationType}</h2>

              {/* address */}
              <h2 className="flex gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                {item.address}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;
