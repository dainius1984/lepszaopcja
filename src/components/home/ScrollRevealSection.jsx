import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

/**
 * Owija sekcję strony głównej: wylanianie przy wejściu w viewport podczas scrolla.
 */
export default function ScrollRevealSection({ children, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 48, scale: 0.985 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
