"use client";
import { useEffect } from "react";

const CLARITY_ID = "rz760od61s"; // your Clarity Project ID

export default function Clarity() {
  useEffect(() => {
    if (!window || window.clarity) return; // prevent duplicate script

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(script);
  }, []);

  return null; // no visible UI
}
