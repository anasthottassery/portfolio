"use client";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import SectionHero from "@SectionHero";
const SectionFeaturedProject = dynamic(() => import("@/sections/home/SectionFeaturedProject"), { ssr: false });
const SectionContact = dynamic(() => import("@/sections/home/SectionContact"), { ssr: false });

const SectionLeetCode = dynamic(() => import("@/sections/home/SectionLeetCode"), { ssr: false });

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://anasthottassery.dev/#website",
      name: "Mohammed Anas Thottassery",
      alternateName: "Anas Thottassery",
      url: "https://anasthottassery.dev/",
    },
    {
      "@type": "Person",
      "@id": "https://anasthottassery.dev/#person",
      name: "Mohammed Anas Thottassery",
      alternateName: "Anas Thottassery",
      url: "https://anasthottassery.dev/",
      jobTitle: "Software Developer",
      sameAs: [
        "https://github.com/anasthottassery",
        "https://www.linkedin.com/in/anasthottassery/",
      ],
    },
  ],
};


export default function Home() {
  const [portraitReady, setPortraitReady] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  useEffect(() => {
    if (portraitReady) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setSlowLoad(true), 8000);
    return () => { document.body.style.overflow = previousOverflow; clearTimeout(timer); };
  }, [portraitReady]);

  useEffect(() => {
    if (!portraitReady) return;
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // If Navbar is handling a scroll-to-contact, skip the scroll-past-navbar
    const shouldScrollToContact =
      sessionStorage.getItem("scrollToContact") === "true" ||
      window.location.hash === "#contact";

    if (shouldScrollToContact) {
      sessionStorage.removeItem("scrollToContact");
      return; // Navbar handles the contact scroll directly
    }

    // Default: scroll past the navbar so "hello" starts at the top (desktop only)
    const isMobile = window.innerWidth < 900;

    if (isMobile) return; // No offset scroll on mobile – start at natural top

    const scrollTarget = 100;

    let frameId;
    let attempts = 0;

    const tryScroll = () => {
      attempts++;
      const canScroll =
        document.documentElement.scrollHeight >
        window.innerHeight + scrollTarget;

      if (canScroll || attempts >= 100) {
        window.scrollTo({ top: scrollTarget, behavior: "instant" });
      } else {
        frameId = requestAnimationFrame(tryScroll);
      }
    };

    frameId = requestAnimationFrame(tryScroll);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [portraitReady]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      {!portraitReady && <Box role="status" aria-live="polite" sx={{ position: "fixed", inset: 0, zIndex: 1500, bgcolor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 500, letterSpacing: "-.06em", animation: "loader-breathe 2s ease-in-out infinite", "@keyframes loader-breathe": { "0%, 100%": { opacity: 1 }, "50%": { opacity: .45 } }, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>MD.AT</Typography>
        <Box aria-hidden="true" sx={{ width: 112, height: 2, bgcolor: "#e8e8e8", overflow: "hidden", borderRadius: 1 }}>
          <Box sx={{ width: "40%", height: "100%", bgcolor: "#111", borderRadius: 1, animation: "loader-sweep 1.4s ease-in-out infinite", "@keyframes loader-sweep": { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(350%)" } }, "@media (prefers-reduced-motion: reduce)": { animation: "none", transform: "translateX(75%)" } }} />
        </Box>
        <Typography sx={{ fontSize: 12, color: "#666", letterSpacing: 1 }}>Loading portrait…</Typography>
        {slowLoad && <Button onClick={() => setPortraitReady(true)} sx={{ color: "#111", fontSize: 12 }}>Continue while it loads</Button>}
      </Box>}
      <Box
        inert={!portraitReady}
        aria-busy={!portraitReady}
        sx={{
          // paddingTop: {xs: "20px", md: "unset"},
          visibility: portraitReady ? "visible" : "hidden",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%"
          }}
        >
          <SectionHero ready={portraitReady} onPortraitReady={setPortraitReady} />
        </Box>
        <SectionFeaturedProject />
        <SectionLeetCode />
        <SectionContact />
      </Box>
    </>
  );
}