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

function EditListing() {
  const [date, setDate] = useState();
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-lg text-center">
        Enter some more details about your listing
      </h2>
      <div className="p-8 rounded-xl border grid gap-7 mt-6  shadow-md  ">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2  xl:grid-cols-3 gap-5">
          {/* Offer or Request */}
          <div className="flex flex-col gap-2">
            <h2 className="text-md text-slate-500">
              Do you want to Offer or Request Donation?
            </h2>
            <RadioGroup defaultValue="Offer">
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
            <h2 className="text-md text-slate-500">
              Donation Drive Organizer type?
            </h2>
            <Select>
              <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                <SelectValue placeholder="Select Organizer type" />
              </SelectTrigger>
              <SelectContent>
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
            <h2 className="text-md text-slate-500">Donation Drive Name</h2>
            <Input
              placeholder="Ex. Donation Drive 1"
              name="driveName"
              className="rounded-xl border-gray-300"
            />
          </div>
        </div>

        <div>
          <div className="grid  grid-cols-1 md:grid-cols-2 sm:grid-cols-2  xl:grid-cols-3 gap-5">
            {/* Select Donation Needs */}
            <div className="flex flex-col gap-2">
              <h2 className="text-md text-slate-500">Donation Needs</h2>
              <Select>
                <SelectTrigger className="w-[220px] rounded-xl border-gray-300">
                  <SelectValue placeholder="Select Donation Needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Clothes">Clothes</SelectItem>
                  <SelectItem value="Stationary">Stationary</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Mixed Donation">Mixed Donation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Pick Date */}
            <div className="flex flex-col gap-2">
              <h2 className="text-md text-slate-500">Pick a Date</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal rounded-xl border-gray-300",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white"
                  align="start"
                  avoidCollisions="false"
                  side="bottom"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditListing;

// {/* Select Donation Needs */}
// <div className="flex flex-col gap-2">
// <h2 className="text-md text-slate-500">Donation Needs</h2>
// <Select>
//   <SelectTrigger className="w-[220px] rounded-xl">
//     <SelectValue placeholder="Select Donation Needs" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="Food">Food</SelectItem>
//     <SelectItem value="Clothes">Clothes</SelectItem>
//     <SelectItem value="Stationary">Stationary</SelectItem>
//     <SelectItem value="Financial">Financial</SelectItem>
//     <SelectItem value="Mixed Donation">Mixed Donation</SelectItem>
//   </SelectContent>
// </Select>
// </div>
// {/* Pick Date */}
// <div className="flex md:mt-5 flex-col gap-2">
// <h2 className="text-md text-slate-500">Pick a Date</h2>
// <Popover>
//   <PopoverTrigger asChild>
//     <Button
//       variant={"outline"}
//       className={cn(
//         "w-[240px] justify-start text-left font-normal rounded-xl",
//         !date && "text-muted-foreground"
//       )}
//     >
//       <CalendarIcon className="mr-2 h-4 w-4" />
//       {date ? format(date, "PPP") : <span>Pick a date</span>}
//     </Button>
//   </PopoverTrigger>
//   <PopoverContent
//     className="w-auto p-0 bg-white"
//     align="start"
//     avoidCollisions="false"
//     side="bottom"
//   >
//     <Calendar
//       mode="single"
//       selected={date}
//       onSelect={setDate}
//       initialFocus
//     />
//   </PopoverContent>
// </Popover>
// </div>

// <div className="flex md:mt-5 flex-col gap-2"></div>
