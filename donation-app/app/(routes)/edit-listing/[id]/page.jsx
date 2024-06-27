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

function EditListing({ params }) {
  const [date, setDate] = useState();
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);

  // returns the id of the dynamic routing page
  useEffect(() => {
    // console.log(params.split("/")[2]);
    user && verifyUserRecord();
  }, [user]);

  //verify user to make sure user can access its own record
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("created_by", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);
    if (data) {
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
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();
    if (data) {
      toast.success("Listing Updated and Published", {
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
      } else {
        console.log("data", data);
      }
    }
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-lg text-center">
        Enter some more details about your listing
      </h2>

      <Formik
        initialValues={{
          donationType: "",
          organizerType: "",
          driveName: "",
          donationNeeds: "",
          startDate: "",
          endDate: "",
          description: "",
          // donationType: listing.donationType || "",
          // organizerType: listing.organizerType || "",
          // driveName: listing.driveName || "",
          // donationNeeds: listing.donationNeeds || "",
          // startDate: listing.startDate || "",
          // endDate: listing.endDate || "",
          // description: listing.description || "",
          profileImage: user?.imageUrl,
          userName: user?.fullName,
        }}
        // enableReinitialize
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
                      // value={values.donationType}
                      // onValueChange={(v) => setFieldValue("donationType", v)}
                      // defaultValue={listing?.donationType}
                      onValueChange={(v) => (values.donationType = v)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Offer" id="Offer" />
                        <Label htmlFor="Offer">Offer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Request" id="Request" />
                        <Label htmlFor="Request">Request</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Select Donation Organizer */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-gray-500">
                      Donation Drive Organizer type?
                    </h2>
                    <Select onValueChange={(e) => (values.organizerType = e)}>
                      <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                        <SelectValue
                          placeholder={"Select Organizer type"}
                          // listing?.organizerType
                          // ? listing?.organizerType
                          // :
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
                      defaultValue={listing?.driveName}
                      placeholder={"Ex. Donation Drive 1"}
                      // listing?.driveName
                      //     ? listing?.driveName
                      //     :
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
                      <Select onValueChange={(e) => (values.donationNeeds = e)}>
                        <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                          <SelectValue
                            placeholder={"Select Donation Needs"}
                            // listing?.donationNeeds
                            //     ? listing?.donationNeeds
                            //     :
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

                    {/* 
                    // asddasd */}
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
                            <C
                            // asddasdon className="mr-2 h-4 w-4" />
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
                        // asddasd
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
                    <FileUpload setImages={(value) => setImages(value)} />
                  </div>
                </div>

                {/* row 4 */}
                <div className="flex gap-7 justify-end">
                  {/* save button */}
                  <Button
                    variant="outline"
                    className="text-black font-semibold border-primary border-2 rounded-xl bg-green-50"
                  >
                    Save
                  </Button>

                  {/* save and publish */}
                  <Button className=" font-semibold rounded-xl">
                    Save and Publish
                  </Button>
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
