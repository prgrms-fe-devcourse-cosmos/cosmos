import React, { useEffect, useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import cloud from "/images/home/clouds.png";

export default function Earth() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    new THREE.TextureLoader().load(cloud, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );

      globe.scene().add(clouds);

      const rotateClouds = () => {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      };
      rotateClouds();
    });
  }, []);
  return (
    <Globe
      ref={globeEl}
      animateIn={false}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="rgba(0,0,0,0)"
    />
  );
}
