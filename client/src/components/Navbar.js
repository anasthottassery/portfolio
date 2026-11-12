"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "./icons/MenuIcon";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import useBreakpoint from "../hooks/useBreakpoints";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

const SlideUp = React.forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Navbar() {
  const { isMdDown } = useBreakpoint();
  const slideDistance = isMdDown ? 64 : 80;
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => { if (!isMdDown) setMenuOpen(false); }, [isMdDown]);

  return (
    <Box component="header" sx={{ mt: 0, py: { xs: 0, md: "10px" }, width: "100%", position: 'relative', zIndex: 10 }}>
    <motion.div
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeInOut" }}
      style={{
        zIndex: 1000,
        display: "flex",
        top: 0,
        left: 0,
        height: slideDistance,
        width: "100%",
        padding: 0,
        alignItems: "stretch",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          maxWidth: "1170px",
          mx: "auto",
          px: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: { xs: "20px", md: "20px" },
            pb: { xs: "10px", md: "10px" },
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                position: "relative",
                width: { xs: "100px", sm: "105px", md: "110px" }, 
                height: { xs: "36px", sm: "38px", md: "40px" }, 
              }}
            >
              <Image
                src={logo}
                alt="MD.AT logo"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
                priority
              />
            </Box>
          </Link>
        </Box>

        {/* Desktop nav links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            pt: "6px",
            pb: "6px",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              style={{ textDecoration: 'none', borderBottom: pathname === item.href ? "1px solid #111" : "1px solid transparent" }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  position: "relative",
                  ml: "40px",
                  px: "20px",
                  py: "10px",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: { xs: "18px", md: "24px" },
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#000",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#666",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Hamburger menu for small screens */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} size="large">
            <MenuIcon color="#000000" size={36} />
          </IconButton>
        </Box>
      </Box>
    </motion.div>

    {/* Fullscreen mobile menu dialog */}
    <Dialog
      fullScreen
      aria-label="Navigation"
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      TransitionComponent={SlideUp}
      transitionDuration={reducedMotion ? 0 : 400}
      slotProps={{ paper: { "data-lenis-prevent": true } }}
      sx={{
        display: { md: "none" },
        "& .MuiDialog-paper": {
          backgroundColor: "#000",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          px: "24px",
          py: "20px",
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100px",
                height: "36px",
                filter: "invert(1)",
              }}
            >
              <Image
                src={logo}
                alt="MD.AT logo"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            </Box>
          </Link>
          <IconButton
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>

        {/* Nav Links */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <AnimatePresence>
            {menuOpen &&
              navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={reducedMotion ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: reducedMotion ? 0 : 0.15 + index * 0.08,
                  }}
                >
                  <Link
                    href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "48px",
                        fontWeight: 500,
                        fontFamily: "Manrope, sans-serif",
                        color: "#fff",
                        py: "8px",
                        lineHeight: 1.2,
                        transition: "color 0.3s ease",
                        "&:active": { color: "#888" },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </Box>

        {/* Bottom: Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.5 }}
        >
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              pt: "20px",
              pb: "12px",
            }}
          >
            <Typography
              component="a"
              href="mailto:thottassery.anas@gmail.com"
              sx={{
                fontSize: "16px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.3s ease",
                "&:hover": { color: "#fff" },
              }}
            >
              thottassery.anas@gmail.com
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Dialog>
    </Box>
  );
}

export default Navbar;
