"use client";
import { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CertificateGallery from "@/components/CertificateGallery";
import Reveal from "@/components/Reveal";
import { education, experience, skillCategories } from "@/data/resume";
const sections = [["experience", "Experience"], ["education", "Education"], ["skills", "Technical skills"], ["certificates", "Certificates"]];
function Section({ id, number, title, children }) {
  return <Box component="section" id={id} aria-labelledby={`${id}-heading`} sx={{ scrollMarginTop: { xs: 88, md: 32 }, borderTop: "1px solid #ddd", pt: 3, pb: 6 }}><Reveal><Box sx={{ display: "flex", gap: 2, alignItems: "baseline", mb: 3 }}><Typography sx={{ color: "#888", fontSize: 12, fontFamily: "monospace" }}>{number}</Typography><Typography component="h2" id={`${id}-heading`} sx={{ fontSize: 28, letterSpacing: "-.5px" }}>{title}</Typography></Box></Reveal>{children}</Box>;
}
function DatedHeading({ title, period, level = "h3" }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: period ? "minmax(0, 1fr) 180px" : "1fr" }, alignItems: "start", gap: { xs: .75, sm: 3 } }}>
    <Typography component={level} sx={{ fontSize: level === "h4" ? 18 : 21, fontWeight: 500, lineHeight: 1.5 }}>{title}</Typography>
    {period && <Typography className="entry-date" sx={{ fontSize: 12, fontVariantNumeric: "tabular-nums", color: "#555", textAlign: { xs: "left", sm: "right" }, pt: { sm: .6 }, whiteSpace: "nowrap" }}>{period.replace(" - ", " — ")}</Typography>}
  </Box>;
}
export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("experience");
  useEffect(() => {
    let frame;
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => {
      let active = "experience";
      for (const [id] of sections) if (document.getElementById(id)?.getBoundingClientRect().top <= 160) active = id;
      setActiveSection(active);
    }); };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);
  return <Container maxWidth={false} sx={{ maxWidth: 1170, px: "20px", pt: { xs: 4, md: 6 }, pb: 8 }}>
    <Reveal><Typography sx={{ fontSize: 12, color: "#666", letterSpacing: 2, mb: 2 }}>BACKGROUND / EXPERIENCE / CURIOSITY</Typography><Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 3, mb: 5 }}><Box><Typography component="h1" sx={{ fontSize: { xs: 52, md: 80 }, letterSpacing: "-.04em", lineHeight: 1 }}>Behind the work.</Typography><Typography sx={{ color: "#666", mt: 2, lineHeight: 1.7 }}>Software development, practical experience, and continuous learning.</Typography></Box><Button className="no-print" variant="outlined" onClick={() => window.print()} startIcon={<DownloadIcon />} sx={{ borderColor: "#111", color: "#111", fontSize: 13 }}>Save as PDF</Button></Box></Reveal>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "200px minmax(0,1fr)" }, gap: { xs: 4, md: 7 } }}>
      <Box component="nav" aria-label="Resume sections" className="no-print" sx={{ alignSelf: "start", position: { md: "sticky" }, top: 28, display: "flex", flexDirection: { xs: "row", md: "column" }, flexWrap: "wrap", gap: { xs: 1, md: 0 } }}>{sections.map(([id,label],i) => <Box component="a" href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined} sx={{ textDecoration: "none", color: activeSection === id ? "#111" : "#666", bgcolor: activeSection === id ? "#f3f3f1" : "transparent", borderRadius: 1, transition: "background-color .2s ease", fontWeight: activeSection === id ? 600 : 400, display: "flex", gap: 2, py: 1.5, px: 1.5, fontSize: 13, borderBottom: { md: "1px solid #eee" }, "&:hover": { color: "#000" } }}><Box component="span" sx={{ color: "#888", fontSize: 11 }}>{`0${i+1}`}</Box>{label}</Box>)}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Section id="experience" number="01" title="Experience">
          {experience.map((exp,i) => <Reveal key={exp.role} delay={i*.04}><Box component="article" sx={{ mb: 4, pb: 3, borderBottom: "1px solid #e2e2df", "&:last-child": { mb: 0 } }}><DatedHeading title={exp.role} period={exp.period} /><Typography sx={{ fontSize: 13, color: "#666", mt: .5, mb: 2 }}>{exp.org}</Typography>{exp.description && <Typography sx={{ fontSize: 14, color: "#555", lineHeight: 1.85 }}>{exp.description}</Typography>}
            {exp.projects?.map(project => <Box key={project.title} sx={{ borderTop: "1px solid #e2e2df", pt: 3, mt: 3 }}><DatedHeading title={project.title} period={project.period} level="h4" /><Typography sx={{ fontSize: 12, color: "#666", mt: 1 }}>{project.stack}</Typography><Box component="ul" sx={{ pl: 2, fontSize: 14, lineHeight: 1.85, color: "#555", "& li + li": { mt: .75 } }}>{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</Box></Box>)}
          </Box></Reveal>)}
        </Section>
        <Section id="education" number="02" title="Education">{education.map(edu => <Reveal key={edu.degree}><DatedHeading title={edu.degree} period={edu.period} /><Typography sx={{ fontSize: 14, color: "#666", mt: 1 }}>{edu.field}</Typography><Typography sx={{ fontSize: 14, lineHeight: 1.85, color: "#555", mt: 2 }}>{edu.description}</Typography></Reveal>)}</Section>
        <Section id="skills" number="03" title="Technical skills"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>{skillCategories.map((category,i) => <Reveal key={category.label} delay={i%2*.06}><Typography component="h3" sx={{ fontSize: 12, color: "#666", letterSpacing: 1, textTransform: "uppercase", mb: 1.25 }}>{category.label}</Typography><Box sx={{ display: "flex", flexWrap: "wrap", gap: .75 }}>{category.skills.map(skill => <Chip key={skill} label={skill} size="small" sx={{ fontSize: 12, bgcolor: "#f3f3f3", borderRadius: 1, height: 28 }} />)}</Box></Reveal>)}</Box></Section>
        
      </Box>
    </Box>
    <Box id="certificates" className="no-print" sx={{ scrollMarginTop: { xs: 88, md: 32 }, borderTop: "1px solid #ddd", pt: 5, mt: 3 }}><CertificateGallery /></Box>
    <style jsx global>{`@media print { header, .no-print { display: none !important; } .reveal { opacity: 1 !important; transform: none !important; } main { margin: 0; } section { break-inside: auto; } h2,h3,h4 { break-after: avoid; } h1 { font-size: 28pt !important; } h2 { font-size: 18pt !important; } h3 { font-size: 14pt !important; } h4 { font-size: 12pt !important; } body { color: #000; background: #fff; } }`}</style>
  </Container>;
}
