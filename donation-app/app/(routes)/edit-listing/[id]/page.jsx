"use client";
import React, { useState } from "react";
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

function EditListing() {
  const [date, setDate] = useState();
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
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="p-8 rounded-xl border grid gap-7 mt-6  shadow-md  ">
                {/* row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2  xl:grid-cols-3 gap-5">
                  {/* Offer or Request */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm text-slate-500">
                      Do you want to Offer or Request Donation?
                    </h2>
                    <RadioGroup
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
                    <h2 className="text-sm text-slate-500">
                      Donation Drive Organizer type?
                    </h2>
                    <Select onValueChange={(e) => (values.organizerType = e)}>
                      <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                        <SelectValue placeholder="Select Organizer type" />
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
                    <h2 className="text-sm text-slate-500">
                      Donation Drive Name
                    </h2>
                    <Input
                      placeholder="Ex. Donation Drive 1"
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
                      <h2 className="text-sm text-slate-500">Donation Needs</h2>
                      <Select onValueChange={(e) => (values.donationNeeds = e)}>
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
                    {/* Pick Date */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm text-slate-500">Pick a Date</h2>
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
                      <h2 className="text-sm text-slate-500">Description</h2>
                      <Textarea
                        placeholder="Enter Description"
                        name="description"
                        className="rounded-xl border-gray-300"
                        onChange={handleChange}
                      />
                    </div>
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
