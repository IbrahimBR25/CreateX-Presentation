"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Fait apparaître son contenu en fondu lorsqu'il entre dans la zone visible.
 * Respecte `prefers-reduced-motion` (géré en CSS) et reste visible sans JavaScript (voir <noscript> dans la page).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`lp-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--lp-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
