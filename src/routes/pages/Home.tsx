import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

export default function Home() {
  const globeEl = useRef<any>(null);

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    // Auto rotate 설정
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    // 구름 추가
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
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
    <div className="relative min-h-screen w-full flex justify-center items-center">
      {/* 텍스트를 절대 위치로 위쪽 중앙에 배치 */}
      <h1 className="absolute top-30 left-1/2 -translate-x-1/2 text-[color:var(--primary-300)] text-3xl font-[yapari] z-10">
        WELCOME
      </h1>
      <Globe
        ref={globeEl}
        animateIn={false}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      />
    </div>
  );
}
