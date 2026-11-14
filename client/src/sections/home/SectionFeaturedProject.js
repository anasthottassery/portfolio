"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Container, Typography, Chip, Link } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ProjectArt from "@/components/ProjectArt";

export default function SectionFeaturedProject() {
  const reducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      aria-labelledby="featured-heading"
      sx={{
        py: { xs: "4rem", md: "6rem" },
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1170px",
          mx: "auto",
          px: "20px",
        }}
      >
        <motion.div
          initial={reducedMotion ? false : { y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.17, 0.55, 0.55, 1],
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: { xs: 3, md: 4 } }}>
            <Typography sx={{ fontSize: 12, letterSpacing: 2, color: "#666" }}>
              IN FOCUS / SELECTED PROJECT
            </Typography>
            <Chip
              label="Ongoing"
              size="small"
              sx={{ bgcolor: "#111", color: "#fff", fontSize: 11, height: 22 }}
            />
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 7 },
            alignItems: "center",
          }}
        >
          <Box>
            <motion.div
              initial={reducedMotion ? false : { y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.1,
              }}
            >
              <Typography
                component="h2"
                id="featured-heading"
                sx={{
                  fontSize: { xs: 64, md: 96 },
                  lineHeight: 1,
                  letterSpacing: "-.04em",
                }}
              >
                Relay
              </Typography>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  color: "#666",
                  mt: 2,
                  maxWidth: 380,
                  lineHeight: 1.5,
                }}
              >
                Connecting devices.
                <br />
                Across ecosystems.
              </Typography>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#555",
                  lineHeight: 1.85,
                  mt: 3,
                }}
              >
                A cross-platform communication framework exploring BLE-assisted
                discovery, Wi-Fi communication, and platform-specific transports
                for device-to-device connectivity.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 3 }}>
                {["C/C++", "Swift", "Kotlin", "BLE", "Wi-Fi"].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ borderRadius: 1, bgcolor: "#f3f3f3", fontSize: 11 }}
                  />
                ))}
              </Box>
              <Link
                href="/projects"
                underline="none"
                sx={{
                  display: "inline-flex",
                  gap: 1,
                  alignItems: "center",
                  color: "#111",
                  mt: 4,
                  fontSize: { xs: 16, md: 18 },
                  "&:hover, &:focus-visible": { gap: 1.5 },
                  transition: "gap .2s ease",
                }}
              >
                View all projects <ArrowOutwardIcon sx={{ fontSize: 18 }} />
              </Link>
            </motion.div>
          </Box>

          <motion.div
            initial={reducedMotion ? false : { y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              ease: [0.17, 0.55, 0.55, 1],
              delay: 0.2,
            }}
          >
            <Box
              className="project-card"
              sx={{ "& > div": { height: { xs: 240, md: 360 } } }}
            >
              <ProjectArt title="Relay" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                color: "#666",
                fontSize: 11,
                letterSpacing: 1,
              }}
            >
              <span>DISCOVERY → CONNECTION → TRANSFER</span>
              <span>01 / 04</span>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
