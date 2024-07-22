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

  const [animationParent] = useAutoAnimate(); // Formkit auto-animate hook

  // Render the header component
  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-4 text-sm">
        {/* Logo and main navigation */}
        <section ref={animationParent} className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={170} height={100} />
          </Link>

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
              href={"/"}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
                <span>About us</span>
              </p>
            </Link>

            <Link
              href={"/"}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
                <span>Contact us</span>
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
      </div>
    </div>
  );
}

export default Header;
