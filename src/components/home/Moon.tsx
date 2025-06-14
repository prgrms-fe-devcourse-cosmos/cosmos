import React, { useEffect, useRef } from "react";
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
