"use client";
import React from "react";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { RiFilePaper2Line } from "react-icons/ri";
import UserListingsProfileModalSection from "./UserListingsProfileModalSection.jsx";

function UserProfileModal({ onClose }) {
  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <UserProfile routing="hash">
          <UserButton.UserProfilePage
            label="My Listings"
            labelIcon={<RiFilePaper2Line />}
            url="my-listing"
          >
            <UserListingsProfileModalSection onClose={onClose} />
          </UserButton.UserProfilePage>
        </UserProfile>
      </div>
    </div>
  );
}

export default UserProfileModal;
