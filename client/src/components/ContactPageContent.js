"use client";
import { Box, Container, Typography, Link } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
const channels = [
  { number: "01", label: "Email", text: "thottassery.anas@gmail.com", href: "mailto:thottassery.anas@gmail.com", note: "For opportunities, projects, and a good conversation." },
  { number: "02", label: "LinkedIn", text: "Connect professionally", href: "https://www.linkedin.com/in/anasthottassery", note: "Experience, updates, and professional connections." },
  { number: "03", label: "GitHub", text: "Explore my code", href: "https://github.com/anasthottassery", note: "Projects, experiments, and work in progress." },
  { number: "04", label: "Instagram", text: "A little beyond the code", href: "https://instagram.com/anas.nazz", note: "The creative side of things." },
];
export default function ContactPageContent() {
  return <Container maxWidth={false} sx={{ maxWidth: 1170, px: "20px", mx: "auto", pt: { xs: 5, md: 9 }, pb: { xs: 7, md: 12 } }}>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" }, gap: { xs: 5, md: 9 } }}>
      <Box>
        <Typography sx={{ fontSize: 12, color: "#666", letterSpacing: "2px", mb: 3 }}>CONTACT / START A CONVERSATION</Typography>
        <Typography component="h1" sx={{ fontSize: { xs: 66, sm: 88, md: 96 }, fontWeight: 500, lineHeight: .98, letterSpacing: "-0.06em" }}>Good things<br />start with<br /><Box component="span" sx={{ color: "#888" }}>a hello.</Box></Typography>
        <Typography sx={{ maxWidth: 370, color: "#666", lineHeight: 1.8, mt: 4, fontSize: { xs: 16, md: 18 } }}>Have a software role, a project to build, or an idea to explore? Tell me what you have in mind.</Typography>
        <Box sx={{ mt: { xs: 3, md: 7 }, width: 64, height: "1px", bgcolor: "#000" }} />
        <Typography sx={{ mt: 2, fontSize: 13, color: "#777" }}>Mohammed Anas T · Software & creative work</Typography>
      </Box>
      <Box sx={{ pt: { md: 6 } }}>
        {channels.map(channel => <Link key={channel.label} href={channel.href} {...(channel.label !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})} underline="none" sx={{ color: "#000", display: "block", borderTop: "1px solid #ddd", py: { xs: 3, md: 3.5 }, "&:last-child": { borderBottom: "1px solid #ddd" }, "& .contact-arrow": { transition: "transform .25s ease" }, "&:hover .contact-arrow, &:focus-visible .contact-arrow": { transform: "translate(3px, -3px)" }, "&:focus-visible": { outline: "2px solid black", outlineOffset: 4 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}><Typography sx={{ fontSize: 12, color: "#777", textTransform: "uppercase", letterSpacing: "1.5px" }}>{channel.number} / {channel.label}</Typography><ArrowOutwardIcon className="contact-arrow" sx={{ fontSize: 22 }} /></Box>
          <Typography sx={{ fontSize: { xs: 21, sm: 25 }, letterSpacing: "-.5px", lineHeight: 1.4, overflowWrap: "anywhere" }}>{channel.text}</Typography>
          <Typography sx={{ fontSize: 13, color: "#777", mt: 1, lineHeight: 1.6 }}>{channel.note}</Typography>
        </Link>)}
      </Box>
    </Box>
  </Container>;
}
