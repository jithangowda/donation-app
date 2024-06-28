import { format } from "date-fns";
import { Building, CalendarDays, MapPin, User, Users } from "lucide-react";
import Image from "next/image.js";
import React from "react";

function Listing({ listing }) {
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

  //   date format (dd-mm-yyyy)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {listing?.length > 0
          ? listing?.map((item, index) => (
              <div className="hover:border-2 hover:border-primary cursor-pointer rounded-xl p-2">
                <Image
                  src={item.listingImages[0].url}
                  width={800}
                  height={150}
                  className="rounded-xl object-cover h-[170px]"
                />
                <div className="flex flex-col m-2 gap-2">
                  {/* dontaion type - offer/request */}
                  <h2 className="font-bold text-xl">{item.donationType}</h2>

                  {/* address */}
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {item.address}
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
                  <div className="mt-2">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-xl p-2 text-gray-500 justify-center items-center">
                      {getOrganizerIcon(item.organizerType)}
                      <span>{item.organizerType}</span>
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
