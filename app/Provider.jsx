"use client";
import React from "react";
import Header from "./_component/Header";
import { Toaster } from "@/components/ui/sonner.jsx";
import { LoadScript } from "@react-google-maps/api";

function Provider({ children }) {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        libraries={["places"]}
      >
        <Header />
        <Toaster />
        <div className="pt-16">{children}</div>
      </LoadScript>
    </div>
  );
}

export default Provider;
