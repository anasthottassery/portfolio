"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Container, Typography, Link, Tooltip, Button } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
const DAY = 86400000;
const colors = ["#eeeeee", "#bdbdbd", "#888888", "#444444", "#111111"];
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
        <motion.div
          initial={reducedMotion ? false : { y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.17, 0.55, 0.55, 1],
          }}
        >
          <Typography sx={{ fontSize: 13, letterSpacing: "2px", color: "#666", mb: 2 }}>
            PROBLEM SOLVING
          </Typography>
          <Typography
            id="leetcode-heading"
            component="h2"
            sx={{
              fontSize: { xs: 40, md: 64 },
              fontWeight: 500,
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            A little better, every day.
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
          <Link
            href="https://leetcode.com/u/mohdanast/"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#000",
              transition: "gap 0.3s ease",
              "&:hover, &:focus-visible": { gap: "12px" },
            }}
          >
            <Typography component="span" sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 500 }}>
              View on LeetCode
            </Typography>
            <ArrowOutwardIcon sx={{ fontSize: "18px" }} />
          </Link>
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
          <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "16px", p: { xs: 2, md: 4 }, mt: 4 }}>
            {!data ? (
              <Box role="status">
                <Typography>
                  {error
                    ? "Activity is unavailable right now. Visit my LeetCode profile or try again."
                    : "Loading LeetCode activity…"}
                </Typography>
                {error && (
                  <Button
                    onClick={() => {
                      setError(false);
                      setRefreshKey((key) => key + 1);
                    }}
                  >
                    Try again
                  </Button>
                )}
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "end",
                    gap: { xs: 3, md: 6 },
                    mb: 3,
                    pb: 3,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 32, letterSpacing: "-1px", lineHeight: 1.2 }}>
                      {total}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#666", mt: 0.5 }}>Submissions</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 32, letterSpacing: "-1px", lineHeight: 1.2 }}>
                      {active}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#666", mt: 0.5 }}>Active days</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, color: "#666", ml: { md: "auto" } }}>
                    Past 365 days · {formatDate(new Date(data.updatedAt))}
                  </Typography>
                </Box>
                <Box
                  ref={calendarRef}
                  data-lenis-prevent
                  tabIndex={0}
                  role="region"
                  aria-label="LeetCode submission calendar; scroll horizontally to see all dates"
                  sx={{
                    overflowX: "auto",
                    pb: 1,
                    "&:focus-visible": { outline: "2px solid black", outlineOffset: 4 },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridAutoColumns: "13px",
                      gap: "4px",
                      width: "max-content",
                      mb: 1,
                      height: 18,
                    }}
                    aria-hidden="true"
                  >
                    {Array.from({ length: Math.ceil(days.length / 7) }, (_, week) => {
                      const day = days
                        .slice(week * 7, week * 7 + 7)
                        .find((d) => d && (d.date.getUTCDate() === 1 || week === 0));
                      return (
                        <Box key={week} sx={{ fontSize: 10, color: "#666", whiteSpace: "nowrap" }}>
                          {day
                            ? day.date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })
                            : ""}
                        </Box>
                      );
                    })}
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateRows: "repeat(7, 13px)",
                      gridAutoFlow: "column",
                      gridAutoColumns: "13px",
                      gap: "4px",
                      width: "max-content",
                    }}
                  >
                    {days.map((day, i) =>
                      day ? (
                        <Tooltip
                          key={i}
                          title={`${formatDate(day.date)}: ${day.count} submissions`}
                          arrow
                          describeChild
                        >
                          <Box
                            tabIndex={day.count ? 0 : undefined}
                            aria-label={`${formatDate(day.date)}: ${day.count} submissions`}
                            sx={{
                              borderRadius: "3px",
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
                <Typography sx={{ display: { xs: "block", md: "none" }, fontSize: 11, color: "#666", mt: 1 }}>
                  Swipe horizontally to explore the year
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2, justifyContent: "flex-end" }}>
                  <Typography variant="caption">Less</Typography>
                  {colors.map((color) => (
                    <Box key={color} sx={{ width: 13, height: 13, borderRadius: "3px", bgcolor: color }} />
                  ))}
                  <Typography variant="caption">More</Typography>
                </Box>
                <Typography sx={{ mt: 2, color: "#666", fontSize: 13 }}>
                  Submission activity, not unique problems solved. Last synced{" "}
                  {new Date(data.updatedAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · UTC dates.
                </Typography>
                {error && (
                  <Typography role="status" sx={{ mt: 1, color: "#666", fontSize: 13 }}>
                    Could not refresh. Showing the last successful sync.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
