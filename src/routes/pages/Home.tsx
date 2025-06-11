import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";

export default function Home() {
  const globeEl = useRef<any>(null);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token")) {
      async function setUserInHome() {
        const localId = JSON.parse(
          localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token")!
        ).user.id;
        const localToken = JSON.parse(
          localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token")!
        ).access_token;
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", localId);
        setUser(data![0], localToken);
        console.log(localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token"));
      }
      setUserInHome();
    }
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === "SIGNED_IN") {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id);
        userData && setUser(userData[0], session.access_token);
      }
    });
  }, []);

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    const CLOUDS_IMG_URL = "/images/earth/clouds.png";
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

    // const starGeometry = new THREE.BufferGeometry();
    // const starCount = 10000;
    // const positions = new Float32Array(starCount * 3);

    // for (let i = 0; i < starCount; i++) {
    //   positions[i * 3] = Math.random() * 2000 - 1000;
    //   positions[i * 3 + 1] = Math.random() * 2000 - 1000;
    //   positions[i * 3 + 2] = Math.random() * 2000 - 1000;
    // }

    // starGeometry.setAttribute(
    //   "position",
    //   new THREE.BufferAttribute(positions, 3)
    // );

    // const starMaterial = new THREE.PointsMaterial({
    //   color: 0xffffff,
    //   size: 0.5,
    // });
    // const stars = new THREE.Points(starGeometry, starMaterial);

    // globe.scene().add(stars);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center">
      {/* <h1 className="absolute top-30 left-1/2 -translate-x-1/2 text-[color:var(--primary-300)] text-3xl font-[yapari] z-10">
        WELCOME
      </h1> */}
      <Globe
        ref={globeEl}
        animateIn={false}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
}
