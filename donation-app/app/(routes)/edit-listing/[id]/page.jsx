"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Formik } from "formik";
import { usePathname } from "next/navigation.js";
import { supabase } from "@/utils/supabase/client.js";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation.js";
import { Loader, ServerIcon } from "lucide-react";
import FileUpload from "../_component/FileUpload.jsx";
import Loading from "@/app/_component/Loading.jsx";

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
} from "@/components/ui/alert-dialog";

function EditListing({ params }) {
  const [date, setDate] = useState();
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // returns the id of the dynamic routing page
  useEffect(() => {
    // console.log(params.split("/")[2]);
    user && verifyUserRecord();
  }, [user]);

  //verify user to make sure user can access its own record
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("created_by", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      console.log(data);
      setListing(data[0]);

      // Set initial date state if startDate and endDate exist
      if (data[0]?.startDate && data[0]?.endDate) {
        setDate({
          from: new Date(data[0].startDate),
          to: new Date(data[0].endDate),
        });
      }
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();
    if (data) {
      toast.success("Listing Updated Successfully", {
        duration: 2000,
        style: {
          background: "#90D26D",
        },
      });
    } else if (error) {
      console.error("Error updating listing:", error.message);
      toast.error("Failed to update listing", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
      setLoading(false);
      return;
    }

    //add images to supabase
    for (const image of images) {
      const file = image;
      // const fileName = file.name;
      const fileName = Date.now().toString();
      const fileExtension = fileName.split(".").pop();

      //supabase storage
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExtension}`,
          upsert: false,
        });

      if (error) {
        console.error("Error updating listing:", error.message);
        toast.error("Error while Uploading Images");
        setLoading(false);
      } else {
        //IMAGE-URL
        const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

        //add image-url to listingImages table in supabase
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageURL, listing_id: params?.id }])
          .select();

        if (error) {
          setLoading(false);
          return;
        }
      }
    }
    setLoading(false);
  };

  //alet-dialog publish function
  const publishBtnHandler = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("listing")
        .update({ active: true })
        .eq("id", params?.id)
        .select();

      if (error) {
        console.error("Error publishing listing:", error.message);
        toast.error("Failed to publish listing", {
          duration: 2000,
          style: {
            background: "#E3342F",
          },
        });
      } else {
        console.log("Listing published Successfully", data);
        toast.success("Listing Published Successfully", {
          duration: 2000,
          style: {
            background: "#90D26D",
          },
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Failed to publish listing due to unexpected error", {
        duration: 2000,
        style: {
          background: "#E3342F",
        },
      });
    } finally {
      setLoading(false);
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

      <Formik
        initialValues={{
          // donationType: "",
          // organizerType: "",
          // driveName: "",
          // donationNeeds: "",
          // startDate: "",
          // endDate: "",
          // description: "",
          donationType: listing.donationType || "",
          organizerType: listing.organizerType || "",
          driveName: listing.driveName || "",
          donationNeeds: listing.donationNeeds || "",
          startDate: listing.startDate || "",
          endDate: listing.endDate || "",
          description: listing.description || "",
          profileImage: user?.imageUrl,
          userName: user?.fullName,
        }}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="p-8 rounded-xl border grid gap-7 mt-6 shadow-md  ">
                {/* row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2  xl:grid-cols-3 gap-5">
                  {/* Offer or Request */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Do you want to Offer or Request Donation?
                    </h2>
                    <RadioGroup
                      value={values.donationType}
                      onValueChange={(v) => setFieldValue("donationType", v)}
                      // defaultValue={listing?.donationType}
                      // onValueChange={(v) => (values.donationType = v)}
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

                  {/* Select Donation Organizer */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Donation Drive Organizer type?
                    </h2>
                    <Select
                      value={values.organizerType}
                      onValueChange={(e) => (values.organizerType = e)}
                    >
                      <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                        <SelectValue
                        // placeholder="Select Organizer type"
                        // placeholder={
                        //   listing?.organizerType
                        //     ? listing?.organizerType
                        //     : "Select Organizer type"
                        // }
                        />
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

                  {/* Donation Drive Name */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Donation Drive Name
                    </h2>
                    <Input
                      // defaultValue={listing?.driveName}
                      value={values.driveName}
                      placeholder={"Ex. Donation Drive 1"}
                      name="driveName"
                      className="rounded-xl border-gray-300"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* row 2 */}
                <div>
                  <div className="grid  grid-cols-1 md:grid-cols-2 sm:grid-cols-2  xl:grid-cols-3 gap-5">
                    {/* Select Donation Needs */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm text-gray-500">Donation Needs</h2>
                      <Select
                        value={values.donationNeeds}
                        onValueChange={(e) => (values.donationNeeds = e)}
                      >
                        <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                          <SelectValue
                            placeholder="Select Donation Needs"
                            // placeholder={
                            //   listing?.donationNeeds
                            //     ? listing?.donationNeeds
                            //     : "Select Donation Needs"
                            // }
                          />
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

                    {/* Pick Date */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm text-gray-500">Pick a Date</h2>
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
                </div>

                {/* row 3 */}
                <div>
                  {/* description */}
                  <div className="grid grid-cols-1 gap-10">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm text-gray-500">Description</h2>
                      <Textarea
                        // defaultValue={listing?.description}
                        value={values.description}
                        placeholder="Enter Description"
                        name="description"
                        className="rounded-xl border-gray-300"
                        onChange={handleChange}
                      />
                    </div>
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

                {/* row 4 */}
                <div className="flex gap-7 justify-end">
                  {/* save button */}
                  <Button
                    disabled={loading}
                    className="text-black font-semibold border-primary border-2 rounded-xl bg-green-50"
                  >
                    {loading ? <Loader className="animate-spin" /> : "Save"}
                  </Button>

                  {/* save and publish */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        disabled={loading}
                        className=" font-semibold rounded-xl"
                      >
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Save and Publish"
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you really want to publish the listing?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await handleSubmit();
                            publishBtnHandler();
                          }}
                          className="rounded-xl"
                        >
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
