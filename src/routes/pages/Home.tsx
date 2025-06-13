import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';
import { getCurrentTheme } from '../../types/theme';

export default function Home() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme());
    };
    document.addEventListener('themeChanged', handleThemeChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          setTheme(getCurrentTheme());
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => {
      document.removeEventListener('themeChanged', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe || theme !== 'dark') return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const CLOUDS_IMG_URL = '/images/earth/clouds.png';
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

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
  }, [theme]);

  return (
    <div className='relative min-h-screen w-full flex justify-center items-center'>
      {/* <h1 className="absolute top-30 left-1/2 -translate-x-1/2 text-[color:var(--primary-300)] text-3xl font-[yapari] z-10">
        WELCOME
      </h1> */}

      {theme === 'dark' ? (
        <Globe
          ref={globeEl}
          animateIn={false}
          globeImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg'
          bumpImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png'
          backgroundColor='rgba(0,0,0,0)'
        />
      ) : (
        <div className='planet sun'></div>
      )}
    </div>
  );
}
