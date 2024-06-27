"use client";
import React, { useEffect } from "react";

function loading() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="loading-container flex justify-center items-center min-h-screen">
      <dotlottie-player
        src="https://lottie.host/116a5c2e-bb60-454c-bf52-a8cfec7648e6/chq3IkWgBq.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
}

export default loading;
