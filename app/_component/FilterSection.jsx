import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  ChevronsDown,
  ChevronsUp,
  CircleX,
  HandHelping,
  PencilRuler,
  Search,
  Shirt,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button.jsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";

function FilterSection({
  setFilterDonationType,
  setFilterOrganizerType,
  setFilterDonationNeeds,
  setFilterDate,
  resetFilters,
  handleSearchClick,
  coordinates,
  listing,
}) {
  const [date, setDate] = useState();
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setFilterDate(formattedDate);
  };

  const handleClearFilters = () => {
    setDate(null);
    setFilterDonationType(null);
    setFilterOrganizerType(null);
    setFilterDonationNeeds(null);
    setFilterDate(null);
    resetFilters();
  };

  return (
    <div className="col-span-2  grid grid-cols-2 gap-2 md:flex md:gap-2 mb-2 md:mb-4">
      {/* Clear and search button only visible on mobile */}
      <div className="flex md:hidden col-span-2 justify-center gap-2 ">
        {/* Button to open filters in mobile view */}
        <Popover>
          <PopoverTrigger className="bg-blue-200 rounded-xl w-[340px]">
            Show Filters
          </PopoverTrigger>
          <PopoverContent className="rounded-xl w-[360px] bg-white transform translate-x-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Donation type filter */}
              <Select onValueChange={setFilterDonationType}>
                <SelectTrigger className="md:w-[130px] w-full rounded-xl border-gray-300">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Donation Offer">
                    <div className="flex items-center gap-2">
                      <ChevronsUp
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2>Offer</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Donation Request">
                    <div className="flex items-center gap-2">
                      <ChevronsDown
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2>Request</h2>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Organizer type filter */}
              <Select onValueChange={setFilterOrganizerType}>
                <SelectTrigger className="md:w-[180px] w-full rounded-xl border-gray-300">
                  <SelectValue placeholder="Organizer" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Individual">
                    <div className="flex items-center gap-2">
                      <User
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Individual</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Small Group">
                    <div className="flex items-center gap-2">
                      <Users
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Small Group</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Registered Organization">
                    <div className="flex items-center gap-2">
                      <Building
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Registered Organization</h2>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Donation needs filter */}
              <Select onValueChange={setFilterDonationNeeds}>
                <SelectTrigger className="md:w-[190px] w-full rounded-xl border-gray-300">
                  <SelectValue placeholder="Needs" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Food">
                    <div className="flex items-center gap-2 min-w-0">
                      <UtensilsCrossed
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Food</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Clothes">
                    <div className="flex items-center gap-2 min-w-0">
                      <Shirt
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Clothes</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Stationary">
                    <div className="flex items-center gap-2 min-w-0">
                      <PencilRuler
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Stationary</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Financial">
                    <div className="flex items-center gap-2 min-w-0">
                      <Wallet
                        size={20}
                        strokeWidth={2}
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <h2 className="truncate">Financial</h2>
                    </div>
                  </SelectItem>
                  <SelectItem value="Mixed Donation">
                    <div className="flex items-center gap-2 min-w-0">
                      <HandHelping
                        size={20}
                        strokeWidth={2}
                        className="h-5 w-5 flex-shrink-0"
                      />
                      <h2 className="truncate">Mixed Donation</h2>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Calendar popover for selecting a date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "md:w-[150px] w-full justify-start text-left font-normal rounded-xl border-gray-300",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </PopoverContent>
        </Popover>

        {/* clear button */}
        <div>
          <Button
            onClick={handleClearFilters}
            className="md:w-[120px] flex items-center gap-2 rounded-xl bg-red-300 hover:bg-red-200"
          >
            <CircleX
              size={20}
              strokeWidth={2}
              className="md:h-6 md:w-6 h-5 w-5"
            />
            <h2 className="hidden md:block">Clear</h2>
          </Button>
        </div>
      </div>

      {/* Donation type filter w-[140px]*/}
      <div className="hidden md:block">
        <Select onValueChange={setFilterDonationType}>
          <SelectTrigger className="md:w-[140px] w-full rounded-xl border-gray-300">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Donation Offer">
              <div className="flex items-center gap-2">
                <ChevronsUp
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Offer</h2>
              </div>
            </SelectItem>
            <SelectItem value="Donation Request">
              <div className="flex items-center gap-2">
                <ChevronsDown
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Request</h2>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Organizer type filter w-[190px]*/}
      <div className="hidden md:block">
        <Select onValueChange={setFilterOrganizerType}>
          <SelectTrigger className="md:w-[190px]  w-full rounded-xl border-gray-300">
            <SelectValue placeholder="Organizer" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Individual">
              <div className="flex items-center gap-2">
                <User
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Individual</h2>
              </div>
            </SelectItem>
            <SelectItem value="Small Group">
              <div className="flex items-center gap-2">
                <Users
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Small Group</h2>
              </div>
            </SelectItem>
            <SelectItem value="Registered Organization">
              <div className="flex items-center gap-2">
                <Building
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Registered Organization</h2>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Donation needs filter w-[180px]*/}
      <div className="hidden md:block">
        <Select onValueChange={setFilterDonationNeeds}>
          <SelectTrigger className="md:w-[180px]  w-full rounded-xl border-gray-300">
            <SelectValue placeholder="Needs" />
          </SelectTrigger>
          <SelectContent className="bg-white ">
            <SelectItem value="Food">
              <div className="flex items-center gap-2">
                <UtensilsCrossed
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Food</h2>
              </div>
            </SelectItem>
            <SelectItem value="Clothes">
              <div className="flex items-center gap-2">
                <Shirt
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Clothes</h2>
              </div>
            </SelectItem>
            <SelectItem value="Stationary">
              <div className="flex items-center gap-2">
                <PencilRuler
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Stationary</h2>
              </div>
            </SelectItem>
            <SelectItem value="Financial">
              <div className="flex items-center gap-2">
                <Wallet
                  size={20}
                  strokeWidth={2}
                  className="h-4 w-4 flex-shrink-0"
                />
                <h2>Financial</h2>
              </div>
            </SelectItem>
            <SelectItem value="Mixed Donation">
              <div className="flex items-center gap-2">
                <HandHelping
                  size={20}
                  strokeWidth={2}
                  className="h-5 w-5 flex-shrink-0"
                />
                <h2>Mixed Donation</h2>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar popover for selecting a date w-[150px]*/}
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "md:w-[150px] w-full justify-start text-left font-normal rounded-xl border-gray-300",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Wrapper for search and clear buttons */}
      <div className="hidden md:flex col-span-2 mb-0 justify-center gap-2 md:items-start md:justify-start md:flex-col md:gap-2">
        <Button
          onClick={handleClearFilters}
          className="w-[120px] flex items-center gap-2 rounded-xl bg-red-300 hover:bg-red-200"
        >
          <CircleX size={20} strokeWidth={2} className="h-6 w-6" />
          <h2>Clear</h2>
        </Button>
      </div>
    </div>
  );
}

export default FilterSection;
