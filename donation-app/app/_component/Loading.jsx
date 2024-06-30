"use client";
import { Loader } from "lucide-react";
import React from "react";

// Loading component displays a spinning loader and a message indicating loading state.
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
        <Loader className="animate-spin" />
        <h2>Loading...</h2>
      </div>
    </div>
  );
}

export default Loading;
