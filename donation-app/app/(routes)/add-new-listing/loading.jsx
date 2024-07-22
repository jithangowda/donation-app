import { Loader } from "lucide-react";
import React from "react";

// A loading component displaying a spinner and text while content is being fetched or processed
function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
        <Loader className="animate-spin" /> {/* Animated spinner component */}
        <h2>Loading...</h2> {/* Loading text */}
      </div>
    </div>
  );
}

export default loading;
