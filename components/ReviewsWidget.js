"use client";

import { useEffect, useRef } from "react";

const ROMW_SCRIPT_ID = "romw-script";
const ROMW_SRC =
  "https://reviewsonmywebsite.com/js/v2/embed.js?id=7327de0109f71427cb2f083d3ebcbe1b";

export default function ReviewsWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
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

    const el = containerRef.current;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              loadScript();
              observer.disconnect();
              break;
            }
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Fallback for older browsers
      (window.requestIdleCallback || setTimeout)(loadScript, 0);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-romw-token="u84CN3Jib3vgrBRhLTvfdyM0letRcFnOmjLmv6JT6fck8hADBO"
      style={{ minHeight: 300 }}
    />
  );
}
