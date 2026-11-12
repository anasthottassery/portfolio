"use client";
import { useState } from "react";
import { Box, Container, Typography, Chip, Button, Link, Collapse } from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Reveal from "@/components/Reveal";
import ProjectArt from "@/components/ProjectArt";
import { projects } from "@/data/projects";
const categories = ["All work", "Systems", "Mobile", "Web", "AI / ML"];
function ProjectDetails({ project }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return <Box sx={{ mt: 2.5, borderTop: "1px solid #e5e5e5" }}>
    <Button onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls={`details-${project.id}`} sx={{ width: "100%", justifyContent: "space-between", borderRadius: 0, p: "14px 0", fontSize: 13, color: "#111", "&:hover": { bgcolor: "transparent" } }}>
      Engineering details <AddIcon sx={{ fontSize: 18, transform: open ? "rotate(45deg)" : "none", transition: reduced ? "none" : "transform .25s ease" }} />
    </Button>
    <Collapse in={open} timeout={reduced ? 0 : 250}><Typography id={`details-${project.id}`} sx={{ color: "#555", lineHeight: 1.8, fontSize: 14, pb: 2 }}>{project.details}</Typography></Collapse>
  </Box>;
}
export default function ProjectsPage() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState("All work");
  return <Container maxWidth={false} sx={{ maxWidth: 1170, px: "20px", pt: { xs: 4, md: 6 }, pb: 10 }}>
    <Reveal><Typography sx={{ fontSize: 12, letterSpacing: 2, color: "#666", mb: 2 }}>SELECTED WORK / 01—04</Typography><Typography component="h1" sx={{ fontSize: { xs: 50, md: 80 }, letterSpacing: "-.04em", lineHeight: 1.05 }}>Ideas into<br />working software.</Typography><Typography sx={{ mt: 3, maxWidth: 520, fontSize: 17, color: "#666", lineHeight: 1.8 }}>An exploration of systems, mobile experiences, and the web. Each project brings a different engineering challenge.</Typography></Reveal>
    <Box role="group" aria-label="Filter projects" sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 4, mb: 3 }}>{categories.map(item => <Button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} sx={{ border: "1px solid", borderColor: category === item ? "#111" : "#ddd", bgcolor: category === item ? "#111" : "#fff", color: category === item ? "#fff" : "#555", px: 2.5, py: 1, fontSize: 13, "&:hover": { bgcolor: category === item ? "#333" : "#f5f5f5" } }}>{item}</Button>)}</Box>
    <Typography role="status" sx={{ fontSize: 12, color: "#666", mb: 2 }}>{category === "All work" ? "4 projects" : `1 project · ${category}`}</Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 5 } }}><AnimatePresence mode="popLayout" initial={false}>{projects.map((project,i) => (category === "All work" || category === categories[i+1]) && <motion.div layout={reduced ? false : "position"} key={project.id} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .98 }} transition={{ duration: reduced ? 0 : .28 }} style={{ minWidth: 0 }}>
      <Box component="article" className="project-card" sx={{ borderBottom: "1px solid #ddd", pb: 4, height: "100%" }}>
        <ProjectArt title={project.title} />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2.5, mb: 1.5 }}><Typography sx={{ fontSize: 11, color: "#666", letterSpacing: 1.5 }}>{project.id} / {categories[i+1].toUpperCase()}</Typography>{project.status && <Chip label={project.status} size="small" sx={{ bgcolor: "#111", color: "#fff", height: 22, fontSize: 11 }} />}</Box>
        <Typography component="h2" sx={{ fontSize: { xs: 28, md: 34 }, letterSpacing: "-.03em" }}>{project.title}</Typography><Typography sx={{ color: "#666", fontSize: 14, mt: .5, mb: 2 }}>{project.subtitle}</Typography>
        <Typography sx={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{project.description}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75, mt: 2 }}>{project.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{ fontSize: 11, bgcolor: "#f3f3f3", borderRadius: 1, height: 25 }} />)}</Box>
        <ProjectDetails project={project} />
        {project.link && <Link href={project.link} target="_blank" rel="noopener noreferrer" underline="none" sx={{ display: "inline-flex", gap: 1, alignItems: "center", color: "#111", mt: 2, fontSize: 14, "&:hover": { gap: 1.5 } }}>Visit website <ArrowOutwardIcon sx={{ fontSize: 17 }} /></Link>}
      </Box>
    </motion.div>)}</AnimatePresence></Box>
  </Container>;
}
