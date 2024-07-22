import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import UserProfileModal from "./UserProfileModal.jsx";
import { Button } from "@/components/ui/button.jsx";

function ProfileDropDownMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleManageAccountClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="shine-effect cursor-pointer">
            <Image
              src={user?.imageUrl || "/default-profile.png"}
              width={40}
              height={40}
              alt="profile"
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute top-full left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:-translate-x-6 md:w-[360px] md:right-0 mt-2 bg-white w-[250px] max-w-[90vw] rounded-xl p-3">
          <DropdownMenuLabel>
            <div className="flex flex-col md:flex-row items-center space-x-3 md:space-x-4">
              {/* Hide profile picture on mobile view */}
              <div className="hidden md:block">
                <Image
                  src={user?.imageUrl || "/default-profile.png"}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-md font-medium">
                  {user?.fullName || "Guest"}
                </h2>
                <h2 className="text-md font-normal">
                  {user?.emailAddresses?.[0]?.emailAddress || "Not logged in"}
                </h2>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-t border-gray-200 my-2" />
          <DropdownMenuItem className="flex items-center px-4 py-2">
            <button
              onClick={handleManageAccountClick}
              className="flex items-center w-full"
            >
              <div className="flex items-center">
                <MdSettings size={18} className="text-gray-800 mr-7" />
                <h2 className="text-gray-600 font-normal">Manage account</h2>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-t border-gray-200 my-2" />
          <DropdownMenuItem className="flex items-center px-4 py-2">
            <SignOutButton className="flex items-center w-full cursor-pointer">
              <div className="flex items-center">
                <IoLogOutOutline size={18} className="text-gray-900 mr-7" />
                <h2 className="text-gray-600 font-normal">Sign out</h2>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal for UserProfile */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      >
        <div className="relative bg-white p-6 rounded-xl w-full max-w-4xl max-h-[750px] overflow-hidden">
          {/* Container to hold the UserProfile and Close button */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
              <UserProfileModal onClose={closeModal} />
            </div>
          </div>
          {/* Close button positioned absolutely, moved down from the top */}
          <Button
            onClick={closeModal}
            className="absolute top-8 right-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-300 hover:text-black"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default ProfileDropDownMenu;
