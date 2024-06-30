import React, { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "next/navigation.js";
import { Button } from "@/components/ui/button.jsx";

function FilterSection({
  setFilterDonationType,
  setFilterOrganizerType,
  setFilterDonationNeeds,
  setFilterDate,
  resetFilters,
}) {
  const [date, setDate] = useState();
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);

    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setFilterDate(formattedDate);
  };

  const handleClearFilters = () => {
    setDate(null); // Clear selected date
    setFilterDonationType(null); // Clear donation type filter
    setFilterOrganizerType(null); // Clear organizer type filter
    setFilterDonationNeeds(null); // Clear donation needs filter
    setFilterDate(null); // Clear date filter
    resetFilters(); // Trigger function to reset additional filters in parent component
  };
  return (
    <div className="px-3 mb-4 md:gap-2 md:flex flex gap-2">
      {/* donation type (offer/request) */}
      <Select onValueChange={setFilterDonationType}>
        <SelectTrigger className="w-[130px] rounded-xl border-gray-300">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Offer">
            <div className="flex items-center gap-2">
              <ChevronsUp size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Offer</h2>
            </div>
          </SelectItem>
          <SelectItem value="Request">
            <div className="flex items-center gap-2">
              <ChevronsDown size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Request</h2>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* organizer type (Individual/Small Group/Registered Organization) */}
      <Select onValueChange={setFilterOrganizerType}>
        <SelectTrigger className="w-[250px] rounded-xl border-gray-300">
          <SelectValue placeholder="Donation Organizer" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Individual">
            <div className="flex items-center gap-2">
              <User size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Individual</h2>
            </div>
          </SelectItem>
          <SelectItem value="Small Group">
            <div className="flex items-center gap-2">
              <Users size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Small Group</h2>
            </div>
          </SelectItem>
          <SelectItem value="Registered Organization">
            <div className="flex items-center gap-2">
              <Building size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Registered Organization</h2>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* donation needs (Food/Clothes/Stationary/Financial/Mixed Donation) */}
      <Select onValueChange={setFilterDonationNeeds}>
        <SelectTrigger className="w-[190px] rounded-xl border-gray-300">
          <SelectValue placeholder="Donation Needs" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Food">
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Food</h2>
            </div>
          </SelectItem>
          <SelectItem value="Clothes">
            <div className="flex items-center gap-2">
              <Shirt size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Clothes</h2>
            </div>
          </SelectItem>
          <SelectItem value="Stationary">
            <div className="flex items-center gap-2">
              <PencilRuler size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Stationary</h2>
            </div>
          </SelectItem>
          <SelectItem value="Financial">
            <div className="flex items-center gap-2">
              <Wallet size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Financial</h2>
            </div>
          </SelectItem>
          <SelectItem value="Mixed Donation">
            <div className="flex items-center gap-2">
              <HandHelping size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Mixed Donation</h2>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* select date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal rounded-xl border-gray-300",
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

      {/* clear button */}
      <Button
        onClick={handleClearFilters}
        className="felx gap-2 rounded-xl bg-red-300 hover:bg-red-200"
      >
        <CircleX size={20} strokeWidth={2} className="h-6 w-6" />
        <h2 className="mt-1">Clear</h2>
      </Button>
    </div>
  );
}

export default FilterSection;
