import { supabase } from "@/utils/supabase/client.js";
import Listing from "./Listing.jsx";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image.js";
import OpenGoogleMapsPage from "./OpenGoogleMapsPage.jsx";
import {
  Building,
  CalendarDays,
  HandHelping,
  MapPin,
  PencilRuler,
  RectangleEllipsis,
  Shirt,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button.jsx";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function UserListingsProfileModalSection({ onClose }) {
  const { user } = useUser();
  const [listing, setListing] = useState([]);
  const [deletionError, setDeletionError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentListingId, setCurrentListingId] = useState(null);

  useEffect(() => {
    user && GetUserListing();
  }, [user]);

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*,listingImages(url,listing_id)`)
      .eq("created_by", user?.primaryEmailAddress.emailAddress)
      .order("created_at", { ascending: false });
    setListing(data);
  };

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

  const getSkeletonStyle = (fullWidth = false) => ({
    backgroundColor: "#f0f0f0", // Lighter color
    borderRadius: "0.375rem",
    width: fullWidth ? "100%" : "120px",
    height: "34px", // Slightly smaller height
  });

  const openDeleteDialog = (listingId) => {
    setCurrentListingId(listingId);
    setIsDialogOpen(true);
  };

  const deleteListing = async () => {
    if (!currentListingId) return;

    // Delete associated images first
    const { error: imageDeleteError } = await supabase
      .from("listingImages")
      .delete()
      .eq("listing_id", currentListingId);

    if (imageDeleteError) {
      console.error("Error deleting listing images:", imageDeleteError);
      // Handle image deletion error (optional)
      return;
    }

    // Then proceed with deleting the listing
    const { error } = await supabase
      .from("listing")
      .delete()
      .eq("id", currentListingId);

    if (error) {
      setDeletionError(error);
      console.error("Error deleting listing:", error);
      return;
    }

    // Listing deleted successfully, update listings state
    const updatedListings = listing.filter(
      (item) => item.id !== currentListingId
    );
    setListing(updatedListings);
    setDeletionError(null); // Clear any previous errors
    setIsDialogOpen(false); // Close the dialog

    toast.success("The listing has been successfully deleted", {
      duration: 5000,
      style: {
        background: "#90D26D", // Green background color for success
      },
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-md mb-2">Manage your Listings</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <div
                key={index}
                className="flex flex-col h-full hover:border-3 hover:border-primary border-2 cursor-pointer rounded-xl p-1.5"
              >
                <div className="relative">
                  <Image
                    src={
                      item?.listingImages[0]
                        ? item?.listingImages[0]?.url
                        : "/placeholder.svg"
                    }
                    width={400}
                    height={150}
                    alt="listing images"
                    className="rounded-xl object-cover h-[170px]"
                  />
                  <h2
                    className={`absolute top-0 left-0 text-white text-md rounded-br-xl rounded-tl-xl m-0 p-1 ${
                      item.active
                        ? "bg-green-500" // For Published
                        : "bg-red-500" // For Draft
                    }`}
                  >
                    {item.active ? "Published" : "Draft"}
                  </h2>
                </div>

                <div className="flex flex-col m-2 gap-2 flex-grow">
                  <div className="flex justify-between gap-2">
                    <div
                      className={`rounded-xl p-2 flex items-center justify-center ${
                        item.donationType === "Donation Offer"
                          ? "bg-[#A0D6E8]"
                          : "bg-[#FBCEB1]"
                      }`}
                      style={item.active ? {} : getSkeletonStyle()}
                    >
                      {item.active ? (
                        <h2 className="font-semibold text-sm">
                          {item.donationType}
                        </h2>
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded"></div>
                      )}
                    </div>
                    <div>
                      <OpenGoogleMapsPage address={item.address} />
                    </div>
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
                    <span className="flex-grow">
                      {item.active ? item.driveName : "--"}
                    </span>
                  </h2>

                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <CalendarDays
                      size={20}
                      strokeWidth={2}
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="flex-grow">
                      {item.active
                        ? `${formatDate(item.startDate)} to ${formatDate(
                            item.endDate
                          )}`
                        : "-- to --"}
                    </span>
                  </h2>

                  <div className="mt-auto grid gap-2">
                    <h2
                      className="flex w-full gap-2 text-sm bg-[#E6E6FA] rounded-xl p-2 text-gray-700 items-center justify-center whitespace-nowrap"
                      style={item.active ? {} : getSkeletonStyle(true)}
                    >
                      {item.active ? (
                        <>
                          {getOrganizerIcon(item.organizerType)}
                          <span>{item.organizerType}</span>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded"></div>
                      )}
                    </h2>

                    <h2
                      className="flex w-full gap-2 text-sm bg-[#E6E6FA] rounded-xl p-2 text-gray-700 items-center justify-center whitespace-nowrap"
                      style={item.active ? {} : getSkeletonStyle(true)}
                    >
                      {item.active ? (
                        <>
                          {getNeedsIcon(item.donationNeeds)}
                          <span>{item.donationNeeds}</span>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded"></div>
                      )}
                    </h2>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="flex flex-grow gap-2">
                      <Link
                        href={"/view-listing/" + item.id}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full rounded-xl border-gray-400 hover:bg-gray-100"
                          variant="outline"
                          onClick={onClose} // Close the modal
                        >
                          View
                        </Button>
                      </Link>

                      <Link
                        href={"/edit-listing/" + item.id}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full rounded-xl bg-blue-500 text-white hover:bg-blue-300 hover:text-black"
                          onClick={onClose} // Close the modal
                        >
                          Edit
                        </Button>
                      </Link>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl ml-auto bg-red-500 text-white hover:bg-red-400"
                      onClick={() => openDeleteDialog(item.id)}
                    >
                      <FaRegTrashCan className="text-xl" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : // Placeholder elements for loading animation
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          {/* Trigger Button is not used here since the dialog is opened programmatically */}
        </DialogTrigger>
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteListing}
              className="rounded-xl bg-red-600 text-white hover:bg-red-400"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {deletionError && (
        <div className="text-red-500 mt-4">
          Error deleting listing: {deletionError.message}
        </div>
      )}
    </div>
  );
}

export default UserListingsProfileModalSection;
