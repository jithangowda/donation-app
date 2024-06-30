"use client"; // Indication that this component is for client-side rendering
import React, { useEffect, useState } from "react"; // Importing necessary React hooks
import { Label } from "@/components/ui/label"; // Importing custom label component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Importing radio group components

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing select components for dropdowns

import { CalendarIcon } from "@radix-ui/react-icons"; // Importing calendar icon from Radix UI
import { format } from "date-fns"; // Importing date formatting function

import { cn } from "@/lib/utils"; // Importing utility function for classNames
import { Button } from "@/components/ui/button"; // Importing custom button component
import { Calendar } from "@/components/ui/calendar"; // Importing calendar component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Importing popover components

import { Input } from "@/components/ui/input.jsx"; // Importing custom input component
import { Textarea } from "@/components/ui/textarea.jsx"; // Importing custom textarea component
import { Formik } from "formik"; // Importing Formik for form management
import { usePathname } from "next/navigation.js"; // Importing next/navigation utilities
import { supabase } from "@/utils/supabase/client.js"; // Importing Supabase client for database operations
import { toast } from "sonner"; // Importing toast notification library
import { useUser } from "@clerk/nextjs"; // Importing user management hook from Clerk
import { useRouter } from "next/navigation.js"; // Importing next/router for navigation
import { Loader, ServerIcon } from "lucide-react"; // Importing icons from Lucide React
import FileUpload from "../_component/FileUpload.jsx"; // Importing custom file upload component
import Loading from "@/app/_component/Loading.jsx"; // Importing loading component

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Importing alert dialog components

function EditListing({ params }) {
  const [date, setDate] = useState(); // State for managing selected date range
  const { user } = useUser(); // Hook to retrieve current user information
  const router = useRouter(); // Hook for managing navigation
  const [listing, setListing] = useState(null); // State for storing fetched listing details
  const [images, setImages] = useState([]); // State for managing uploaded images
  const [loading, setLoading] = useState(false); // State for managing loading state

  // Effect to verify user and fetch listing data
  useEffect(() => {
    user && verifyUserRecord(); // Verify user record if user is defined
  }, [user]);

  // Function to verify user's access to the listing record
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("created_by", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      console.log(data); // Log retrieved data to console
      setListing(data[0]); // Set listing details from fetched data

      // Set initial date state if startDate and endDate exist
      if (data[0]?.startDate && data[0]?.endDate) {
        setDate({
          from: new Date(data[0].startDate),
          to: new Date(data[0].endDate),
        });
      }
    }

    if (data?.length <= 0) {
      router.replace("/"); // Redirect to home page if no data found
    }
  };

  // Function to handle form submission
  const onSubmitHandler = async (formValue) => {
    setLoading(true); // Set loading state to true during form submission

    // Update listing data in the database
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      // Display success toast notification on successful update
      toast.success("Listing Updated Successfully", {
        duration: 2000,
        style: {
          background: "#90D26D",
        },
      });
    } else if (error) {
      console.error("Error updating listing:", error.message);
      // Display error toast notification on failed update
      toast.error("Failed to update listing", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
      setLoading(false); // Set loading state to false on error
      return;
    }

    // Iterate through uploaded images and add them to Supabase storage
    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString(); // Generate unique filename
      const fileExtension = fileName.split(".").pop(); // Get file extension

      // Upload image to Supabase storage
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExtension}`,
          upsert: false,
        });

      if (error) {
        console.error("Error updating listing:", error.message);
        toast.error("Error while Uploading Images"); // Display error toast on image upload failure
        setLoading(false); // Set loading state to false on error
      } else {
        // Construct image URL
        const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

        // Insert image URL into listingImages table in Supabase
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageURL, listing_id: params?.id }])
          .select();

        if (error) {
          setLoading(false); // Set loading state to false on error
          return;
        }
      }
    }
    setLoading(false); // Set loading state to false after image upload completion
  };

  // Function to handle publishing of listing
  const publishBtnHandler = async () => {
    setLoading(true); // Set loading state to true during publishing

    try {
      // Update listing status to active in the database
      const { data, error } = await supabase
        .from("listing")
        .update({ active: true })
        .eq("id", params?.id)
        .select();

      if (error) {
        console.error("Error publishing listing:", error.message);
        // Display error toast notification on publishing failure
        toast.error("Failed to publish listing", {
          duration: 2000,
          style: {
            background: "#E3342F",
          },
        });
      } else {
        console.log("Listing published Successfully", data);
        // Display success toast notification on successful publish
        toast.success("Listing Published Successfully", {
          duration: 2000,
          style: {
            background: "#90D26D",
          },
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      // Display error toast notification on unexpected error
      toast.error("Failed to publish listing due to unexpected error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    } finally {
      setLoading(false); // Set loading state to false after publishing attempt
    }
  };

  // Display a loading message or spinner while the listing is being fetched
  if (listing === null) {
    return <Loading />;
  }

  // Display an error message if no listing was found
  if (!listing) {
    return <div>No listing found with the specified ID.</div>;
  }

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-lg text-center">
        Enter some more details about your listing
      </h2>

      {/* Formik form for handling form state and submission */}
      <Formik
        initialValues={{
          donationType: listing.donationType || "", // Initialize form values with listing data or empty string
          organizerType: listing.organizerType || "",
          driveName: listing.driveName || "",
          donationNeeds: listing.donationNeeds || "",
          startDate: listing.startDate || "",
          endDate: listing.endDate || "",
          description: listing.description || "",
          profileImage: user?.imageUrl, // Set user profile image URL
          userName: user?.fullName, // Set user full name
        }}
        enableReinitialize // Reinitialize form values on state change
        onSubmit={(values) => {
          console.log(values); // Log form values on form submission
          onSubmitHandler(values); // Call onSubmitHandler function with form values
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {/* Main content grid */}
              <div className="p-8 rounded-xl border grid gap-7 mt-6 shadow-md">
                {/* Grid for row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {/* Offer or Request section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Do you want to Offer or Request Donation?
                    </h2>
                    {/* Radio group for selecting donation type */}
                    <RadioGroup
                      value={values.donationType}
                      onValueChange={(v) => setFieldValue("donationType", v)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Donation Offer"
                          id="Donation Offer"
                        />
                        <Label htmlFor="Donation Offer">Donation Offer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Donation Request"
                          id="Donation Request"
                        />
                        <Label htmlFor="Dontion Request">Dontion Request</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Select Donation Organizer section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Donation Drive Organizer type?
                    </h2>
                    {/* Select component for choosing organizer type */}
                    <Select
                      value={values.organizerType}
                      onValueChange={(e) => (values.organizerType = e)}
                    >
                      <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Small Group">Small Group</SelectItem>
                        <SelectItem value="Registered Organization">
                          Registered Organization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Donation Drive Name section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Donation Drive Name
                    </h2>
                    {/* Input field for entering drive name */}
                    <Input
                      value={values.driveName}
                      placeholder={"Ex. Donation Drive 1"}
                      name="driveName"
                      className="rounded-xl border-gray-300"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Grid for row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {/* Select Donation Needs section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">Donation Needs</h2>
                    {/* Select component for choosing donation needs */}
                    <Select
                      value={values.donationNeeds}
                      onValueChange={(e) => (values.donationNeeds = e)}
                    >
                      <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                        <SelectValue placeholder="Select Donation Needs" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Clothes">Clothes</SelectItem>
                        <SelectItem value="Stationary">Stationary</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Mixed Donation">
                          Mixed Donation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pick Date section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">Pick a Date</h2>
                    {/* Popover with calendar component for selecting date range */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full sm:w-[270px] justify-start text-left font-normal rounded-xl border-gray-300 ",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {/* Display selected date range or prompt to pick a date */}
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "dd-MM-yyyy")} -{" "}
                                {format(date.to, "dd-MM-yyyy")}
                              </>
                            ) : (
                              format(date.from, "dd-MM-yyyy")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="custom-calendar-container"
                        align="start"
                        side="bottom"
                      >
                        {/* Calendar component for selecting date range */}
                        <Calendar
                          className="custom-calendar"
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            if (selectedDate?.from) {
                              setFieldValue(
                                "startDate",
                                format(selectedDate.from, "yyyy-MM-dd")
                              );
                            }
                            if (selectedDate?.to) {
                              setFieldValue(
                                "endDate",
                                format(selectedDate.to, "yyyy-MM-dd")
                              );
                            }
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Grid for row 3 */}
                <div className="grid grid-cols-1 gap-10">
                  {/* Description section */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">Description</h2>
                    {/* Textarea for entering description */}
                    <Textarea
                      value={values.description}
                      placeholder="Enter Description"
                      name="description"
                      className="rounded-xl border-gray-300"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* FileUpload */}
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Upload Location Images
                    </h2>
                    <FileUpload
                      setImages={(value) => setImages(value)}
                      imageList={listing.listingImages}
                    />
                  </div>
                </div>

                {/* Grid for row 4 */}
                <div className="flex gap-7 justify-end">
                  {/* Save button */}
                  <Button
                    disabled={loading}
                    className="text-black font-semibold border-primary border-2 rounded-xl bg-green-50"
                  >
                    {/* Display loader or 'Save' text based on loading state */}
                    {loading ? <Loader className="animate-spin" /> : "Save"}
                  </Button>

                  {/* Save and Publish button with AlertDialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        disabled={loading}
                        className="font-semibold rounded-xl"
                      >
                        {/* Display loader or 'Save and Publish' text based on loading state */}
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Save and Publish"
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    {/* AlertDialog content for confirmation */}
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you really want to publish the listing?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        {/* Cancel button for AlertDialog */}
                        <AlertDialogCancel className="rounded-xl">
                          Cancel
                        </AlertDialogCancel>
                        {/* Publish button for AlertDialog */}
                        <AlertDialogAction
                          onClick={async () => {
                            await handleSubmit();
                            publishBtnHandler();
                          }}
                          className="rounded-xl"
                        >
                          {/* Display loader or 'Publish' text based on loading state */}
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Publish"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
