"use client";

import { useEffect, useRef } from "react";

const ROMW_SCRIPT_ID = "romw-script";
const ROMW_SRC =
  "https://reviewsonmywebsite.com/js/v2/embed.js?id=773b324f11cfad43f9fe2dbb7cc5408d";

export default function ReviewsWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load script immediately when component mounts
    const loadScript = () => {
      if (document.getElementById(ROMW_SCRIPT_ID)) return;
      const s = document.createElement("script");
      s.id = ROMW_SCRIPT_ID;
      s.src = ROMW_SRC;
      s.type = "text/javascript";
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    };

    // Load script immediately
    loadScript();
  }, []);

  return (
    <div
      ref={containerRef}
      data-romw-token="k0TcKA6d0BCjFadEg3WMgp168nf0JAA5XcQTR8LeZhw05Ziyij"
      style={{ minHeight: 300 }}
    />
  );
}
