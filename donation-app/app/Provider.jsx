import React from "react";
import Header from "./_component/Header";
import { Toaster } from "@/components/ui/sonner.jsx";

function Provider({ children }) {
  return (
    <div>
      <Header />
      <Toaster />
      <div>{children}</div>
    </div>
  );
}

export default Provider;
