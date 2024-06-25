"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Header() {
  const pathname = usePathname();

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(pathname);
  }, []);

  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <div className="mx-auto flex top-0 z-10 w-full max-w-7xl justify-between px-4 py-4 text-sm ">
      <section ref={animationParent} className="flex items-center gap-8 ">
        <Image src={"/logo.svg"} alt="logo" width={170} height={100} />
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
        <div className="hidden md:flex items-center gap-4 transition-all">
          <Link
            href={"/"}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span
                className={`'hover:text-primary font-medium text-sm cursor-pointer'
                            ${pathname == "/" && "text-primary"}`}
              >
                Home
              </span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>

          <Link
            href={"/"}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span>About us</span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>

          <Link
            href={"/"}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span>Contact us</span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>
        </div>
      </section>

      <section className=" hidden md:flex items-center gap-8 ">
        <Link href={"/add-new-listing"}>
          <Button className="flex rounded-xl gap-2">
            <PlusIcon className="h-5 w-5" />
            Post your listing
          </Button>
        </Link>

        {isSignedIn ? (
          <UserButton />
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

      <FiMenu
        onClick={openSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
}

//mobile view for navbar
function MobileNav({ closeSideMenu }) {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden z-30">
      <div className=" h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl "
          />
        </section>

        <div className="flex flex-col gap-4 transition-all">
          <Link
            href={"/"}
            onClick={closeSideMenu}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span
                className={`'hover:text-primary font-medium text-sm cursor-pointer'
                            ${pathname == "/" && "text-primary"}`}
              >
                Home
              </span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>

          <Link
            href={"/"}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span>About us</span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>

          <Link
            href={"/"}
            className="relative group  px-2 py-3 transition-all "
          >
            <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
              <span>Contacts</span>
              {/* <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0"/> */}
            </p>
          </Link>
        </div>

        <section className="flex flex-col items-center gap-8 mt-4 w-full">
          <Link href={"/add-new-listing"}>
            <Button className="flex rounded-xl gap-2 " onClick={closeSideMenu}>
              <PlusIcon className="h-5 w-5" />
              Post your listing
            </Button>
          </Link>

          {isSignedIn ? (
            <UserButton />
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
