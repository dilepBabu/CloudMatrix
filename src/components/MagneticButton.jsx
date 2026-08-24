import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useCursor } from "../context/CursorContext";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.create("a");
const MotionButton = motion.create("button");

export default function MagneticButton({
  children,

  // ============================================================
  // NAVIGATION
  // ============================================================
  to,
  href,

  // ============================================================
  // MAGNETIC EFFECT
  // ============================================================
  strength = 0.18,

  // ============================================================
  // CURSOR
  // ============================================================
  cursorLabel,
  cursorVariant = "default",
  cursorColor,

  // ============================================================
  // STYLING
  // ============================================================
  className = "",

  // ============================================================
  // BUTTON
  // ============================================================
  type = "button",
  disabled = false,

  // ============================================================
  // EVENTS
  // ============================================================
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,

  ...rest
}) {
  const ref = useRef(null);

  const cursorContext = useCursor?.() || {};

  const { setCursor, clearCursor } = cursorContext;

  // ============================================================
  // MAGNETIC MOTION
  // ============================================================

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 320,
    damping: 26,
    mass: 0.2,
  });

  const springY = useSpring(y, {
    stiffness: 320,
    damping: 26,
    mass: 0.2,
  });

  // ============================================================
  // POINTER MOVE
  // ============================================================

  const handlePointerMove = (event) => {
    if (disabled) return;

    if (event.pointerType && event.pointerType !== "mouse") {
      return;
    }

    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;

    const distanceY = event.clientY - centerY;

    const maxX = Math.max(18, rect.width * 0.12);

    const maxY = Math.max(14, rect.height * 0.2);

    const nextX = Math.max(-maxX, Math.min(maxX, distanceX * strength));

    const nextY = Math.max(-maxY, Math.min(maxY, distanceY * strength));

    x.set(nextX);
    y.set(nextY);
  };

  // ============================================================
  // ENTER
  // ============================================================

  const handlePointerEnter = (event) => {
    if (!disabled && cursorLabel) {
      setCursor?.({
        label: cursorLabel,
        variant: cursorVariant,
        color: cursorColor,
      });
    }

    onMouseEnter?.(event);
  };

  // ============================================================
  // LEAVE
  // ============================================================

  const handlePointerLeave = (event) => {
    x.set(0);
    y.set(0);

    clearCursor?.();

    onMouseLeave?.(event);
  };

  // ============================================================
  // CLICK
  // ============================================================

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // IMPORTANT:
    // Never preventDefault here.
    // React Router and normal browser links
    // need the click event.
    onClick?.(event);
  };

  // ============================================================
  // FOCUS
  // ============================================================

  const handleFocus = (event) => {
    if (!disabled && cursorLabel) {
      setCursor?.({
        label: cursorLabel,
        variant: cursorVariant,
        color: cursorColor,
      });
    }

    onFocus?.(event);
  };

  // ============================================================
  // BLUR
  // ============================================================

  const handleBlur = (event) => {
    clearCursor?.();

    x.set(0);
    y.set(0);

    onBlur?.(event);
  };

  // ============================================================
  // COMMON MOTION PROPS
  // ============================================================

  const motionProps = {
    ref,

    onPointerMove: handlePointerMove,

    onPointerEnter: handlePointerEnter,

    onPointerLeave: handlePointerLeave,

    onFocus: handleFocus,

    onBlur: handleBlur,

    style: {
      ...(rest.style || {}),

      x: springX,
      y: springY,

      transformOrigin: "center",

      willChange: "transform",

      pointerEvents: disabled ? "none" : "auto",
    },

    className: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "transform-gpu",
      "select-none",
      "touch-manipulation",

      disabled ? "cursor-not-allowed" : "cursor-pointer",

      className,
    ]
      .filter(Boolean)
      .join(" "),
  };

  // ============================================================
  // REACT ROUTER LINK
  // ============================================================

  if (to) {
    return (
      <MotionLink
        {...rest}
        {...motionProps}
        to={to}
        onClick={handleClick}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </MotionLink>
    );
  }

  // ============================================================
  // EXTERNAL LINK
  // ============================================================

  if (href) {
    return (
      <MotionAnchor
        {...rest}
        {...motionProps}
        href={disabled ? undefined : href}
        onClick={handleClick}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </MotionAnchor>
    );
  }

  // ============================================================
  // REAL BUTTON
  // ============================================================

  return (
    <MotionButton
      {...rest}
      {...motionProps}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </MotionButton>
  );
}
