"use client";
import { Box, Typography } from "@mui/material";
const codes = { Relay: ["01 / DISCOVER", "02 / CONNECT", "03 / TRANSFER"], Muvv: ["LOCALIZE", "MAP", "NAVIGATE"], "Royal Gold Algo": ["REACT", "MARKET DATA", "RESPONSIVE UI"], "Fake News Detection": ["ARTICLE", "TF-IDF", "CLASSIFY"] };
export default function ProjectArt({ title }) {
  return <Box aria-hidden="true" sx={{ height: { xs: 180, md: 220 }, position: "relative", overflow: "hidden", bgcolor: title === "Relay" ? "#171717" : "#f0f0ee", color: title === "Relay" ? "#fff" : "#222", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundImage: "radial-gradient(#8883 1px, transparent 1px)", backgroundSize: "18px 18px", "& .art-node": { transition: "transform .5s ease" }, ".project-card:hover & .art-node": { transform: "translateY(-5px)" } }}>
    <Box sx={{ position: "absolute", inset: "12% 22%", border: "1px solid #8885", borderRadius: title === "Relay" ? "50%" : "16px", transform: "rotate(-9deg)" }} />
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, zIndex: 1, px: 2 }}>{codes[title].map((label, i) => <Box key={label} className="art-node" sx={{ bgcolor: title === "Relay" ? "#292929" : "#fff", border: "1px solid #8884", borderRadius: "8px", p: { xs: 1.25, md: 2 }, boxShadow: "0 6px 16px #00000008", transitionDelay: `${i * 60}ms !important` }}><Typography sx={{ fontFamily: "monospace", fontSize: { xs: 9, md: 11 }, letterSpacing: ".5px" }}>{label}</Typography></Box>)}</Box>
    <Typography sx={{ position: "absolute", bottom: 12, left: 16, fontSize: 10, letterSpacing: 2, opacity: .6 }}>CONCEPT / {title.toUpperCase()}</Typography>
  </Box>;
}
