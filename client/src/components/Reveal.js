"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, delay = 0, style }) {
  const reduced = useReducedMotion();
  return <motion.div className="reveal" initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .04 }} transition={{ duration: reduced ? 0 : .3, delay: reduced ? 0 : Math.min(delay, .12), ease: [.22, 1, .36, 1] }} style={style}>{children}</motion.div>;
}
