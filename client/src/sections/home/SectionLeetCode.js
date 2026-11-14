"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Container, Typography, Link, Tooltip, Button, Skeleton } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const DAY = 86400000;
const colors = ["#ebebeb", "#b5b5b5", "#7e7e7e", "#444444", "#111111"];
const formatDate = date => date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function SectionLeetCode() {
  const reducedMotion = useReducedMotion();
  const calendarRef = useRef(null);
  const positioned = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;
    let timeout;
    const refresh = async () => {
      if (inFlight || document.visibilityState === "hidden") return;
      inFlight = true;
      const request = new AbortController();
      const cancel = () => request.abort();
      controller.signal.addEventListener("abort", cancel, { once: true });
      timeout = setTimeout(cancel, 20000);
      try {
        const response = await fetch("https://leetcode-api-faisalshohag.vercel.app/mohdanast", { signal: request.signal, cache: "no-store", credentials: "omit" });
        if (!response.ok) throw new Error("Activity unavailable");
        const result = await response.json();
        const calendar = result.submissionCalendar;
        if (!calendar || typeof calendar !== "object" || Array.isArray(calendar) || Object.entries(calendar).some(([day, count]) => !Number.isFinite(Number(day)) || !Number.isInteger(count) || count < 0)) throw new Error("Invalid activity");
        if (!controller.signal.aborted) {
          setData({ calendar, updatedAt: new Date().toISOString() });
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        clearTimeout(timeout);
        controller.signal.removeEventListener("abort", cancel);
        inFlight = false;
      }
    };
    refresh();
    const interval = setInterval(refresh, 15 * 60 * 1000);
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { controller.abort(); clearTimeout(timeout); clearInterval(interval); document.removeEventListener("visibilitychange", onVisible); };
  }, [refreshKey]);

  useEffect(() => {
    if (data && calendarRef.current && !positioned.current) {
      calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
      positioned.current = true;
    }
  }, [data]);

  const days = useMemo(() => {
    if (!data) return [];
    const end = new Date(data.updatedAt); end.setUTCHours(0, 0, 0, 0);
    const start = new Date(end.getTime() - 364 * DAY);
    const cells = Array(start.getUTCDay()).fill(null);
    for (let i = 0; i < 365; i++) {
      const date = new Date(start.getTime() + i * DAY);
      cells.push({ date, count: Number(data.calendar[Math.floor(date.getTime() / 1000)] || 0) });
    }
    return cells;
  }, [data]);

  const total = days.reduce((sum, day) => sum + (day?.count || 0), 0);
  const active = days.filter(day => day?.count > 0).length;

  return (
    <Box
      id="leetcode"
      component="section"
      aria-labelledby="leetcode-heading"
      sx={{ py: { xs: "4rem", md: "6rem" }, borderTop: "1px solid #e0e0e0" }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "1170px", mx: "auto", px: "20px" }}>
        {/* Header Block: Kicker, Headline, and CTA Link */}
        <motion.div
          initial={reducedMotion ? false : { y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.17, 0.55, 0.55, 1],
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              gap: 2,
              mb: { xs: 4, md: 5 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "#666",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                PROBLEM SOLVING / LEETCODE
              </Typography>
              <Typography
                id="leetcode-heading"
                component="h2"
                sx={{
                  fontSize: { xs: 36, sm: 48, md: 64 },
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                A little better, every day.
              </Typography>
            </Box>

            <Link
              href="https://leetcode.com/u/mohdanast/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#111",
                fontSize: { xs: 15, md: 16 },
                fontWeight: 500,
                pb: 0.5,
                borderBottom: "1px solid #ccc",
                transition: "gap 0.2s ease, border-color 0.2s ease",
                "&:hover, &:focus-visible": {
                  gap: "12px",
                  borderColor: "#000",
                },
              }}
            >
              <span>View profile</span>
              <ArrowOutwardIcon sx={{ fontSize: "16px" }} />
            </Link>
          </Box>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={reducedMotion ? false : { y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.15,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: { xs: 4, sm: 6, md: 8 },
              pt: { xs: 1, md: 2 },
              pb: { xs: 3, md: 4 },
              borderBottom: "1px solid #ebebeb",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 38, md: 48 },
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {data ? total : <Skeleton width={80} height={48} />}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#777", letterSpacing: 1.5, textTransform: "uppercase", mt: 1 }}>
                Submissions
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 38, md: 48 },
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {data ? active : <Skeleton width={80} height={48} />}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#777", letterSpacing: 1.5, textTransform: "uppercase", mt: 1 }}>
                Active days
              </Typography>
            </Box>

            {data && (
              <Box sx={{ ml: { sm: "auto" }, alignSelf: { sm: "flex-end" } }}>
                <Typography sx={{ fontSize: 12, color: "#888", fontVariantNumeric: "tabular-nums" }}>
                  Past 365 days · {formatDate(new Date(data.updatedAt))}
                </Typography>
              </Box>
            )}
          </Box>
        </motion.div>

        {/* Heatmap Grid & Legend (Borderless) */}
        <motion.div
          initial={reducedMotion ? false : { y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.25,
          }}
        >
          <Box sx={{ pt: { xs: 3, md: 4 } }}>
            {!data ? (
              error ? (
                <Box sx={{ py: 4, textAlign: "left" }}>
                  <Typography sx={{ color: "#666", fontSize: 14, mb: 1.5 }}>
                    Activity is temporarily unavailable right now.
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setError(false);
                      setRefreshKey((k) => k + 1);
                    }}
                    sx={{ color: "#111", borderColor: "#ddd", textTransform: "none", fontSize: 13 }}
                  >
                    Retry loading
                  </Button>
                </Box>
              ) : (
                <Box sx={{ py: 2 }}>
                  <Skeleton variant="rectangular" height={130} sx={{ borderRadius: 1, bgcolor: "#f5f5f3" }} />
                </Box>
              )
            ) : (
              <>
                <Box
                  ref={calendarRef}
                  data-lenis-prevent
                  tabIndex={0}
                  role="region"
                  aria-label="LeetCode submission calendar; scroll horizontally to see all dates"
                  sx={{
                    overflowX: "auto",
                    py: 1,
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "#e0e0e0", borderRadius: 3 },
                    "&:focus-visible": { outline: "2px solid black", outlineOffset: 4 },
                  }}
                >
                  {/* Months header */}
                  <Box
                    sx={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: "13px",
                      gap: "4px",
                      width: "max-content",
                      mb: 1.25,
                      height: 18,
                    }}
                    aria-hidden="true"
                  >
                    {Array.from({ length: Math.ceil(days.length / 7) }, (_, week) => {
                      const day = days
                        .slice(week * 7, week * 7 + 7)
                        .find((d) => d && (d.date.getUTCDate() === 1 || week === 0));
                      return (
                        <Box key={week} sx={{ fontSize: 10, color: "#888", whiteSpace: "nowrap", fontFamily: "monospace" }}>
                          {day
                            ? day.date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })
                            : ""}
                        </Box>
                      );
                    })}
                  </Box>

                  {/* 7 rows grid */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateRows: "repeat(7, 13px)",
                      gridAutoFlow: "column",
                      gridAutoColumns: "13px",
                      gap: "4px",
                      width: "max-content",
                      py: 0.5,
                    }}
                  >
                    {days.map((day, i) =>
                      day ? (
                        <Tooltip
                          key={i}
                          title={`${formatDate(day.date)}: ${day.count} ${day.count === 1 ? "submission" : "submissions"}`}
                          arrow
                          describeChild
                        >
                          <Box
                            tabIndex={day.count ? 0 : undefined}
                            aria-label={`${formatDate(day.date)}: ${day.count} submissions`}
                            sx={{
                              width: 13,
                              height: 13,
                              borderRadius: "2.5px",
                              bgcolor:
                                colors[
                                  day.count === 0
                                    ? 0
                                    : day.count < 2
                                    ? 1
                                    : day.count < 4
                                    ? 2
                                    : day.count < 7
                                    ? 3
                                    : 4
                                ],
                              cursor: "pointer",
                              transition: "transform 0.12s ease, box-shadow 0.12s ease",
                              "&:hover": {
                                transform: "scale(1.35)",
                                zIndex: 5,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              },
                              "&:focus-visible": { outline: "2px solid black", outlineOffset: 2 },
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Box key={i} />
                      )
                    )}
                  </Box>
                </Box>

                {/* Mobile scroll hint */}
                <Typography sx={{ display: { xs: "block", md: "none" }, fontSize: 11, color: "#888", mt: 1.5 }}>
                  Swipe horizontally to explore earlier activity
                </Typography>

                {/* Footer notes & Legend */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                    mt: 2.5,
                    pt: 2,
                  }}
                >
                  <Typography sx={{ color: "#888", fontSize: 12 }}>
                    Submission activity over the past year · Synced from LeetCode
                  </Typography>

                  <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
                    <Typography sx={{ fontSize: 11, color: "#888", mr: 0.5 }}>Less</Typography>
                    {colors.map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 11,
                          height: 11,
                          borderRadius: "2px",
                          bgcolor: color,
                        }}
                      />
                    ))}
                    <Typography sx={{ fontSize: 11, color: "#888", ml: 0.5 }}>More</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
