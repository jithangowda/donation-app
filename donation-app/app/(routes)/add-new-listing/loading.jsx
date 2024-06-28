"use client";
import { Loader } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen ">
        <Loader className="animate-spin" />
        <h2>Loading...</h2>
      </div>
    </div>
  );
}

export default loading;
