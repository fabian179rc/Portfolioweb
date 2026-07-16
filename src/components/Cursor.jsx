import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;

    function handleMove(event) {
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }

    function handleOver(event) {
      if (event.target.closest("a, button, [data-cursor-hover]")) {
        dot.classList.add("cursor-dot--active");
      }
    }

    function handleOut(event) {
      if (event.target.closest("a, button, [data-cursor-hover]")) {
        dot.classList.remove("cursor-dot--active");
      }
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
