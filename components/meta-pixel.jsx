"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const META_PIXEL_ID = "678127081880146";

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Pixel and track page view on route change
    if (typeof window.fbq !== "function") return;

    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView", {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      {/* Load Pixel Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `,
        }}
      />

      {/* Noscript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
