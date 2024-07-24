// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"; // Imports for custom Select component
// import {
//   Building,
//   ChevronsDown,
//   ChevronsUp,
//   CircleX,
//   HandHelping,
//   PencilRuler,
//   Search,
//   Shirt,
//   User,
//   Users,
//   UtensilsCrossed,
//   Wallet,
// } from "lucide-react"; // Icon imports from Lucide for visual representation
// import { CalendarIcon } from "@radix-ui/react-icons"; // Icon import from Radix for calendar
// import { format } from "date-fns"; // Date formatting utility
// import { Calendar } from "@/components/ui/calendar"; // Calendar component import
// import { cn } from "@/lib/utils"; // Utility function import for class names
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"; // Imports for Popover component
// import { useSearchParams } from "next/navigation.js"; // Navigation utility for Next.js
// import { Button } from "@/components/ui/button.jsx"; // Button component import
// import MobileViewGoogleMap from "./MobileViewGoogleMap.jsx";

// function FilterSection({
//   setFilterDonationType,
//   setFilterOrganizerType,
//   setFilterDonationNeeds,
//   setFilterDate,
//   resetFilters,
//   handleSearchClick,
//   coordinates,
//   listing,
// }) {
//   const [date, setDate] = useState(); // State for selected date in the calendar

//   // Handler for when a date is selected in the calendar
//   const handleDateSelect = (selectedDate) => {
//     setDate(selectedDate);

//     // Format the selected date for filter application
//     const formattedDate = selectedDate
//       ? format(selectedDate, "yyyy-MM-dd")
//       : null;
//     setFilterDate(formattedDate); // Apply the selected date filter
//   };

//   // Handler to clear all applied filters
//   const handleClearFilters = () => {
//     setDate(null); // Clear selected date
//     setFilterDonationType(null); // Clear donation type filter
//     setFilterOrganizerType(null); // Clear organizer type filter
//     setFilterDonationNeeds(null); // Clear donation needs filter
//     setFilterDate(null); // Clear date filter
//     resetFilters(); // Trigger function to reset additional filters in parent component
//   };

//   return (
//     <div className="col-span-2  px-3  grid grid-cols-2 gap-2 md:flex md:gap-2 mb-[180px] md:mb-4">
//       {/* clear and search button only visible on mobile */}
//       <div className="flex md:hidden col-span-2  justify-center gap-1 ml-[15px]">
//         <div>
//           <Button
//             onClick={handleClearFilters}
//             className="w-[120px] flex items-center gap-2 rounded-xl bg-red-300 hover:bg-red-200"
//           >
//             <CircleX size={20} strokeWidth={2} className="h-6 w-6" />
//             <h2>Clear</h2>
//           </Button>
//         </div>

//         {/* button to open map in mobile view */}
//         <div className="md:hidden  pb-0 block">
//           <Button className="pulse-color-button rounded-xl w-full bg-blue-200 font-semibold text-md"></Button>
//         </div>
//       </div>

//       {/* Donation type filter */}
//       <Select onValueChange={setFilterDonationType}>
//         <SelectTrigger className="md:w-[130px] w-full rounded-xl border-gray-300">
//           <SelectValue placeholder="Type" />
//         </SelectTrigger>
//         <SelectContent className="bg-white">
//           <SelectItem value="Donation Offer">
//             <div className="flex items-center gap-2">
//               <ChevronsUp size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Offer</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Donation Request">
//             <div className="flex items-center gap-2">
//               <ChevronsDown size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Request</h2>
//             </div>
//           </SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Organizer type filter */}
//       <Select onValueChange={setFilterOrganizerType}>
//         <SelectTrigger className="md:w-[180px] w-full rounded-xl border-gray-300">
//           <SelectValue placeholder="Organizer" />
//         </SelectTrigger>
//         <SelectContent className="bg-white">
//           <SelectItem value="Individual">
//             <div className="flex items-center gap-2">
//               <User size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Individual</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Small Group">
//             <div className="flex items-center gap-2">
//               <Users size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Small Group</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Registered Organization">
//             <div className="flex items-center gap-2">
//               <Building size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Registered Organization</h2>
//             </div>
//           </SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Donation needs filter */}
//       <Select onValueChange={setFilterDonationNeeds}>
//         <SelectTrigger className="md:w-[190px] w-full rounded-xl border-gray-300">
//           <SelectValue placeholder="Needs" />
//         </SelectTrigger>
//         <SelectContent className="bg-white ">
//           <SelectItem value="Food">
//             <div className="flex items-center gap-2">
//               <UtensilsCrossed size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Food</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Clothes">
//             <div className="flex items-center gap-2">
//               <Shirt size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Clothes</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Stationary">
//             <div className="flex items-center gap-2">
//               <PencilRuler size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Stationary</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Financial">
//             <div className="flex items-center gap-2">
//               <Wallet size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Financial</h2>
//             </div>
//           </SelectItem>
//           <SelectItem value="Mixed Donation">
//             <div className="flex items-center gap-2">
//               <HandHelping size={20} strokeWidth={2} className="h-4 w-4" />
//               <h2>Mixed Donation</h2>
//             </div>
//           </SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Calendar popover for selecting a date */}
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "md:w-[150px] w-full justify-start text-left font-normal rounded-xl border-gray-300",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0 bg-white" align="start">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={handleDateSelect}
//             initialFocus
//           />
//         </PopoverContent>
//       </Popover>

//       {/* Wrapper for search and clear buttons */}
//       <div className="hidden md:flex col-span-2 mb-0 justify-center gap-2 md:items-start md:justify-start md:flex-col md:gap-2">
//         <Button
//           onClick={handleClearFilters}
//           className="w-[120px] flex items-center gap-2 rounded-xl bg-red-300 hover:bg-red-200"
//         >
//           <CircleX size={20} strokeWidth={2} className="h-6 w-6" />
//           <h2>Clear</h2>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default FilterSection;
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button.jsx";

import GoogleMapsSection from "./GoogleMapsSection.jsx";
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
    <div className="col-span-2 px-3 grid grid-cols-2 gap-2 md:flex md:gap-2 mb-[180px] md:mb-4">
      {/* Clear and search button only visible on mobile */}
      <div className="flex md:hidden col-span-2 justify-center gap-1 ml-[15px]">
        <div>
          <Button
            onClick={handleClearFilters}
            className="w-[120px] flex items-center gap-2 rounded-xl bg-red-300 hover:bg-red-200"
          >
            <CircleX size={20} strokeWidth={2} className="h-6 w-6" />
            <h2>Clear</h2>
          </Button>
        </div>

        {/* Button to open map in mobile view */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="pulse-color-button rounded-xl w-full bg-blue-200 font-semibold text-md">
              Open Map
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full h-full max-w-[calc(100%+1px)]  max-h-[60vh] p-0 bg-white">
            <div className="p-3 mt-9">
              <GoogleMapsSection
                coordinates={coordinates}
                listing={listing}
                zoom={14}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Donation type filter */}
      <Select onValueChange={setFilterDonationType}>
        <SelectTrigger className="md:w-[130px] w-full rounded-xl border-gray-300">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Donation Offer">
            <div className="flex items-center gap-2">
              <ChevronsUp size={20} strokeWidth={2} className="h-4 w-4" />
              <h2>Offer</h2>
            </div>
          </SelectItem>
          <SelectItem value="Donation Request">
            <div className="flex items-center gap-2">
              <ChevronsDown size={20} strokeWidth={2} className="h-4 w-4" />
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

      {/* Donation needs filter */}
      <Select onValueChange={setFilterDonationNeeds}>
        <SelectTrigger className="md:w-[190px] w-full rounded-xl border-gray-300">
          <SelectValue placeholder="Needs" />
        </SelectTrigger>
        <SelectContent className="bg-white ">
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
