import { useEffect, useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import bumpmap from "/images/home/lunar_bumpmap.jpg";
import surface from "/images/home/lunar_surface.jpg";

export default function Moon() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const canvas = globe.renderer().domElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = Math.min(cx, cy) * 0.9;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      globe.controls().enableZoom = dist <= radius;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={surface}
      bumpImageUrl={bumpmap}
      showGraticules={false}
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="rgba(0,0,0,0)"
    />
  );
}
