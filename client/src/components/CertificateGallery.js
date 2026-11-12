"use client";
import { useEffect, useRef, useState, forwardRef } from "react";
import Image from "next/image";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Popper, Paper, IconButton, Fade, Skeleton } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Reveal from "@/components/Reveal";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const FadeTransition = forwardRef(function FadeTransition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const certificates = [
  { title: "AR Indoor Navigation — Research Publication", org: "International Journal of Engineering Research & Technology", date: "5 August 2026 · Volume 15, Issue 07", file: "ar-indoor-navigation-research-publication.webp", description: "An Augmented Reality-Based Indoor Navigation Framework Using Visual SLAM and Dynamic Path Planning. Registration: IJERTV15IS070671." },
  { title: "Artificial Intelligence Internship", org: "Torc Infotech Pvt Ltd", date: "29 June – 16 July 2024", file: "ai-internship-torc-infotech.webp", description: "Certificate of completion for the Artificial Intelligence internship programme." },
  { title: "Certified Penetration Tester", org: "RedTeam Hacker Academy", date: "31 August 2022", file: "certified-penetration-tester-redteam.webp", description: "Network and web application penetration testing, vulnerability management, wireless security, and VAPT report writing. Credential: RTHACPT1140." },
  { title: "Assistant Creative Officer — Recognition", org: "IEDC, MEA Engineering College", date: "Academic year 2024–2025", file: "iedc-assistant-creative-officer-2024-2025.webp", description: "Recognition for contributions to the Innovation & Entrepreneurship Development Centre." },
  { title: "Assistant Creative Officer — Recognition", org: "IEDC, MEA Engineering College", date: "Academic year 2023–2024", file: "iedc-assistant-creative-officer-2023-2024.webp", description: "Recognition for contributions as Assistant Creative Officer. Certificate: MEAIEDCEXC232426." },
  { title: "ENOVA 3.0 — Volunteering", org: "IEDC, MEA Engineering College", date: "21–23 February 2025", file: "enova-3-volunteering-iedc.webp", description: "Volunteered at the three-day national-level flagship event. Certificate: ENVVOL258." },
  { title: "GENIX’23 — Participation", org: "IEDC, MEA Engineering College", date: "8 November 2023", file: "genix-23-participation-iedc.webp", description: "Participated in the GENIX’23 startup bootcamp." },
  { title: "GENIX X.0 — Volunteering", org: "MEA IEDC", date: "19-20 September 2023", file: "genix-x-volunteering-iedc.webp", description: "Volunteered at the two-day residential startup bootcamp." },
];
const groups = [
  { title: "Certifications, research & internship", indices: [2, 0, 1] },
  { title: "Volunteering", indices: [5, 7] },
  { title: "Recognition & participation", indices: [3, 4, 6] },
];
const source = cert => `/certificates/${encodeURIComponent(cert.file)}`;
// Reserve image space during downloads and keep failures recoverable in the viewer.
function CertificateImage({ cert, alt = "", sizes, interactive = false, eager = false }) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const reducedMotion = useReducedMotion();
  const retry = () => { setStatus("loading"); setAttempt(value => value + 1); };
  return <Box aria-busy={status === "loading"} sx={{ position: "relative", height: "100%", width: "100%" }}>
    {status === "loading" && <Skeleton aria-label="Loading certificate" variant="rectangular" animation={reducedMotion ? false : "wave"} sx={{ position: "absolute", inset: 0, height: "100%", borderRadius: 1, bgcolor: "#eeeeec" }} />}
    <Image key={attempt} src={`${source(cert)}${attempt ? `?retry=${attempt}` : ""}`} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"}
      onLoad={() => setStatus("loaded")} onError={() => setStatus("error")}
      style={{ objectFit: "contain", opacity: status === "loaded" ? 1 : 0, transition: reducedMotion ? "none" : "opacity 220ms ease" }} />
    {status === "error" && <Box role="status" sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: 1, alignItems: "center", justifyContent: "center", textAlign: "center", bgcolor: "#f5f5f3", p: 1 }}>
      <Typography component="span" sx={{ fontSize: 12, color: "#666" }}>Certificate image couldn’t load.</Typography>
      {interactive ? <Button size="small" onClick={retry}>Try again</Button> : <Typography component="span" sx={{ fontSize: 11, color: "#777" }}>Open certificate to retry</Typography>}
    </Box>}
  </Box>;
}
export default function CertificateGallery() {
  const ordered = groups.flatMap(group => group.indices.map(index => certificates[index]));
  const [selected, setSelected] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [hoverOpen, setHoverOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const showHover = value => { setHovered(value); setHoverOpen(true); };
  const suppressRestoredFocus = useRef(false);
  const closeTimer = useRef(null);
  const openTimer = useRef(null);
  const currentCert = selected || activeCert;
  const move = direction => {
    const current = selected || activeCert;
    if (!current) return;
    const index = ordered.findIndex(cert => cert.file === current.file);
    const next = ordered[(index + direction + ordered.length) % ordered.length];
    setSelected(next);
    setActiveCert(next);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);
  const closeSoon = () => { clearTimeout(openTimer.current); cancelClose(); closeTimer.current = setTimeout(() => setHoverOpen(false), 80); };
  const preview = cert => {
    suppressRestoredFocus.current = true;
    clearTimeout(openTimer.current);
    cancelClose();
    setHoverOpen(false);
    setSelected(cert);
    setActiveCert(cert);
  };
  useEffect(() => {
    const onEscape = event => { if (event.key === "Escape") { clearTimeout(openTimer.current); setHoverOpen(false); } };
    document.addEventListener("keydown", onEscape);
    return () => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); document.removeEventListener("keydown", onEscape); };
  }, []);
  return <Box component="section" aria-labelledby="certificate-heading">
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 1, mb: 3 }}>
      <Typography id="certificate-heading" component="h2" sx={{ fontSize: 15, letterSpacing: "2.5px", textTransform: "uppercase", color: "#666" }}>Certificates & recognition</Typography>
      {/* <Typography sx={{ fontSize: 12, color: "#777" }}>Hover or tap to preview</Typography> */}
    </Box>
    {groups.map((group, groupIndex) => <Box key={group.title} sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, borderTop: "1px solid #ddd", pt: 2, mb: 2 }}>
        <Typography sx={{ fontSize: 12, color: "#888", fontFamily: "monospace" }}>0{groupIndex + 1}</Typography>
        <Typography component="h3" sx={{ fontSize: 18, fontWeight: 500 }}>{group.title}</Typography>
        <Typography sx={{ ml: "auto", fontSize: 12, color: "#777" }}>{group.indices.length.toString().padStart(2, "0")}</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
        {group.indices.map((index, cardIndex) => {
          const cert = certificates[index];
          return <Reveal key={cert.file} delay={cardIndex * .06} style={{ height: "100%" }}><Box component="button" onClick={() => preview(cert)}
            onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) { cancelClose(); clearTimeout(openTimer.current); const anchor = event.currentTarget; openTimer.current = setTimeout(() => showHover({ cert, anchor }), 220); } }}
            onPointerLeave={closeSoon}
            onFocus={event => { if (suppressRestoredFocus.current) { suppressRestoredFocus.current = false; return; } if (!event.currentTarget.matches(":focus-visible")) return; cancelClose(); showHover({ cert, anchor: event.currentTarget }); }} onBlur={closeSoon}
            aria-label={`Preview ${cert.title}, ${cert.date}`}
            sx={{ width: "100%", height: "100%", minWidth: 0, textAlign: "left", fontFamily: "inherit", color: "#000", background: "#fff", border: "1px solid #e4e4e4", borderRadius: "10px", p: 0, overflow: "hidden", cursor: "pointer", transition: "border-color .2s ease, box-shadow .2s ease", "&:hover": { borderColor: "#999", boxShadow: "0 5px 16px #00000008" }, "&:focus-visible": { outline: "2px solid black", outlineOffset: 3 } }}>
            <Box sx={{ height: 112, position: "relative", bgcolor: "#f7f7f7", borderBottom: "1px solid #eee", p: 1.5 }}>
              <Box sx={{ position: "relative", height: "100%" }}><CertificateImage cert={cert} sizes="(max-width: 600px) 90vw, 350px" /></Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography component="h4" sx={{ fontSize: 15, fontWeight: 600, lineHeight: 1.45 }}>{cert.title}</Typography><ArrowOutwardIcon sx={{ fontSize: 17, flexShrink: 0, mt: .25 }} />
              </Box>
              <Typography sx={{ fontSize: 12, color: "#666", lineHeight: 1.5, mt: 1 }}>{cert.org}</Typography>
              <Typography sx={{ fontSize: 11, color: "#777", mt: .5 }}>{cert.date}</Typography>
            </Box>
          </Box></Reveal>;
        })}
      </Box>
    </Box>)}
    <Popper transition open={hoverOpen && !selected} anchorEl={hovered?.anchor} placement="right-start" aria-hidden="true" sx={{ pointerEvents: "none", zIndex: 1300, display: { xs: "none", sm: "block" } }} modifiers={[{ name: "offset", options: { offset: [0, 14] } }, { name: "flip", options: { fallbackPlacements: ["left-start", "top", "bottom"] } }, { name: "preventOverflow", options: { padding: 16 } }]}>
      {({ TransitionProps }) => <Fade {...TransitionProps} timeout={reducedMotion ? 0 : { enter: 200, exit: 160 }}><Paper elevation={0} sx={{ width: "min(520px, calc(100vw - 32px))", p: 2, border: "1px solid #ddd", borderRadius: 2, boxShadow: "0 16px 48px #0002" }}>
        {hovered && <>
          <Box sx={{ position: "relative", width: "100%", height: "min(350px, 48vh)" }}><CertificateImage key={hovered.cert.file} cert={hovered.cert} sizes="520px" eager /></Box>
          <Typography sx={{ mt: 1.5, fontSize: 14, fontWeight: 600 }}>{hovered.cert.title}</Typography>
          <Typography sx={{ mt: .5, fontSize: 12, color: "#666", lineHeight: 1.6 }}>{hovered.cert.description}</Typography>

        </>}
      </Paper></Fade>}
    </Popper>
    <Dialog
      TransitionComponent={FadeTransition}
      transitionDuration={reducedMotion ? 0 : { enter: 280, exit: 220 }}
      TransitionProps={{
        onExited: () => setActiveCert(null),
      }}
      slotProps={{ paper: { "data-lenis-prevent": true } }}
      open={Boolean(selected)}
      onClose={() => setSelected(null)}
      maxWidth="lg"
      fullWidth
      aria-labelledby="certificate-preview-title"
      scroll="paper"
    >
      <DialogTitle id="certificate-preview-title" sx={{ display: "flex", alignItems: "center", gap: 2, pr: 1, fontSize: { xs: 16, md: 20 } }}>
        <Box sx={{ flex: 1 }}>{currentCert?.title}</Box>
        <IconButton aria-label="Close certificate preview" onClick={() => setSelected(null)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {currentCert && (
          <>
            <Box sx={{ position: "relative", width: "100%", height: { xs: "50vh", md: "65vh" } }}>
              <CertificateImage key={currentCert.file} cert={currentCert} alt={`${currentCert.title} — ${currentCert.org}, ${currentCert.date}`} sizes="95vw" interactive eager />
            </Box>
            <Typography sx={{ fontSize: 13, color: "#666", mt: 2, lineHeight: 1.7 }}>
              {currentCert.description}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, flexWrap: "wrap", gap: 1, justifyContent: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton aria-label="Previous certificate" onClick={() => move(-1)}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ fontSize: 12, color: "#666" }}>
            {ordered.findIndex(cert => cert.file === currentCert?.file) + 1} / {ordered.length}
          </Typography>
          <IconButton aria-label="Next certificate" onClick={() => move(1)}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  </Box>;
}
