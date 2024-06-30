// Importing necessary components and hooks
"use client";
import GoogleAddressSearch from "@/app/_component/GoogleAddressSearch.jsx";
import { Button } from "@/components/ui/button.jsx";
import { supabase } from "@/utils/supabase/client.js";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation.js";
import React, { useState } from "react";
import { toast } from "sonner"; // Assuming 'sonner' is a notification library

// Component for adding a new listing with address and coordinates
function AddNewListing() {
  // State variables
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loader, setLoader] = useState(false); // State for loader animation
  const router = useRouter();

  // Function to handle the next button click
  const nextHandler = async () => {
    setLoader(true); // Activate loader animation

    try {
      // Insert data into Supabase table 'listing'
      const { data, error } = await supabase
        .from("listing")
        .insert([
          {
            address: selectedAddress.label, // Selected address label
            coordinates: coordinates, // Coordinates of the address
            created_by: user?.primaryEmailAddress.emailAddress, // Created by user's email
          },
        ])
        .select();

      if (data) {
        setLoader(false); // Deactivate loader animation
        console.log("New data added", data);

        // Show success toast notification
        toast.success("New Address added for listing", {
          duration: 2000,
          style: {
            background: "#90D26D", // Green background color for success
          },
        });

        // Redirect to edit page for the newly added listing
        router.replace("/edit-listing/" + data[0].id);
      }

      if (error) {
        setLoader(false); // Deactivate loader animation
        console.log(error);

        // Show error toast notification
        toast.error("Error Occured", {
          duration: 2000,
          style: {
            background: "#E57373", // Red background color for error
          },
        });
      }
    } catch (error) {
      console.error("Error adding new listing:", error);
      setLoader(false); // Ensure loader is deactivated on any error
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 h-full flex flex-col gap-5 items-center justify-center ">
        <h2 className="font-bold text-2xl text-center ">Add New Listing</h2>
        <div className="p-5 xl:px-28 w-full rounded-xl border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500 text-center">
            Enter Address which you want to list
          </h2>
          {/* Component for Google Address Search */}
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          {/* Button for triggering the 'nextHandler' function */}
          <Button
            disabled={!selectedAddress || !coordinates || loader} // Disable button if no address selected or loader active
            onClick={nextHandler}
            className="rounded-full"
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}{" "}
            {/* Show loader animation or 'Next' text based on loader state */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
