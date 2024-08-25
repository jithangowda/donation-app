"use client";
import { Button } from "@/components/ui/button"; // Button component import
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs"; // Clerk user authentication imports
import { Plus, PlusIcon, Settings } from "lucide-react"; // Icons for plus sign
import Image from "next/image"; // Image component from Next.js
import Link from "next/link"; // Link component from Next.js
import { usePathname } from "next/navigation"; // Hook to get current pathname from Next.js navigation
import React, { useEffect, useState } from "react"; // React imports
import { IoIosArrowDown } from "react-icons/io"; // Icon for arrow down
import { FiMenu } from "react-icons/fi"; // Icon for menu
import { AiOutlineClose } from "react-icons/ai"; // Icon for close
import { useAutoAnimate } from "@formkit/auto-animate/react"; // Formkit auto-animate hook
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; //shadcn dropdown
import { MdSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import ProfileDropDownMenu from "./ProfileDropDownMenu.jsx";

function Header() {
  const pathname = usePathname(); // Get current pathname from Next.js navigation

  const { user, isSignedIn } = useUser(); // Clerk user authentication hook

  useEffect(() => {
    console.log(pathname); // Log current pathname on component mount
  }, []);

  const [animationParent] = useAutoAnimate({ duration: 200 }); // Formkit auto-animate hook
  const [isSideMenuOpen, setSideMenu] = useState(false); // State for side menu open/close

  function openSideMenu() {
    setSideMenu(true); // Function to open side menu
  }

  function closeSideMenu() {
    setSideMenu(false); // Function to close side menu
  }

  // Render the header component
  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-4 text-sm">
        {/* Logo and main navigation */}
        <section ref={animationParent} className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={170} height={100} />
          </Link>

          {/* code for enabling mobile view */}
          {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}

          <div className="hidden md:flex items-center gap-4 transition-all">
            {/* Links to various sections */}
            <Link
              href={"/"}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
                <span
                  className={`hover:text-primary font-medium text-sm cursor-pointer ${
                    pathname == "/" && "text-primary"
                  }`}
                >
                  Home
                </span>
              </p>
            </Link>

            <Link
              href={"/about-us"}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
                <span
                  className={`hover:text-primary font-medium text-sm cursor-pointer ${
                    pathname == "/about-us" && "text-primary"
                  }`}
                >
                  About us
                </span>
              </p>
            </Link>

            <Link
              href={"/contact-us"}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
                <span
                  className={`hover:text-primary font-medium text-sm cursor-pointer ${
                    pathname == "/contact-us" && "text-primary"
                  }`}
                >
                  Contact us
                </span>
              </p>
            </Link>
          </div>
        </section>

        {/* Actions section */}
        <section className="hidden md:flex items-center gap-8">
          {/* Button to add new listing */}
          <Link href={"/add-new-listing"}>
            <Button className="flex rounded-xl gap-2">
              <PlusIcon className="h-5 w-5" />
              Post your listing
            </Button>
          </Link>

          {/* User authentication button */}
          {isSignedIn ? (
            // <UserButton />
            <ProfileDropDownMenu user={user} />
          ) : (
            <Link href={"/sign-in"}>
              <Button
                variant="outline"
                className="rounded-full border-gray bg-gray-50"
              >
                Login
              </Button>
            </Link>
          )}
        </section>

        {/* Menu icon for mobile view */}
        <div className="md:hidden ml-2">
          <FiMenu onClick={openSideMenu} className="cursor-pointer text-4xl" />
        </div>
      </div>
    </div>
  );
}

// Mobile navigation component
function MobileNav({ closeSideMenu }) {
  const { user, isSignedIn } = useUser(); // Clerk user authentication hook
  const pathname = usePathname(); // Get current pathname from Next.js navigation

  useEffect(() => {
    console.log(pathname); // Log current pathname on component mount
  }, []);

  // Render the mobile navigation menu
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden z-30">
      <div className="h-full w-[75%] bg-white px-4 py-4">
        {/* Close button for mobile menu */}
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl"
          />
        </section>

        {/* Links section */}
        <div className="flex flex-col gap-4 transition-all">
          {/* Link to home */}
          <Link
            href={"/"}
            onClick={closeSideMenu}
            className="relative group px-2 py-3 transition-all"
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
              <span
                className={`hover:text-primary font-medium text-sm cursor-pointer ${
                  pathname == "/" && "text-primary"
                }`}
              >
                Home
              </span>
              {/* Arrow icon for dropdown */}
              {/* <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" /> */}
            </p>
          </Link>

          {/* Link to about us */}
          <Link
            href={"/about-us"}
            onClick={closeSideMenu}
            className="relative group px-2 py-3 transition-all"
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
              <span
                className={`hover:text-primary font-medium text-sm cursor-pointer ${
                  pathname == "/about-us" && "text-primary"
                }`}
              >
                About us
              </span>
              {/* Arrow icon for dropdown */}
              {/* <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" /> */}
            </p>
          </Link>

          {/* Link to contact us */}
          <Link
            href={"/contact-us"}
            onClick={closeSideMenu}
            className="relative group px-2 py-3 transition-all"
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
              <span
                className={`hover:text-primary font-medium text-sm cursor-pointer ${
                  pathname == "/contact-us" && "text-primary"
                }`}
              >
                Contacts
              </span>
              {/* Arrow icon for dropdown */}
              {/* <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" /> */}
            </p>
          </Link>
        </div>

        {/* Actions section */}
        <section className="flex flex-col items-center gap-8 mt-4">
          {/* Button to add new listing */}
          <div className="w-full">
            <Link href={"/add-new-listing"}>
              <Button
                className="flex rounded-xl gap-2"
                style={{ width: "100%" }}
                onClick={closeSideMenu}
              >
                <PlusIcon className="h-5 w-5" />
                Post your listing
              </Button>
            </Link>
          </div>

          {/* User authentication button */}
          {isSignedIn ? (
            // <UserButton />
            <ProfileDropDownMenu user={user} />
          ) : (
            <Link href={"/sign-in"}>
              <Button
                variant="outline"
                className="rounded-full border-gray bg-gray-50"
                onClick={closeSideMenu}
              >
                Login
              </Button>
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}

export default Header;
