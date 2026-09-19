import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ResponsiveCamera } from "./components/ResponsiveCamera";
import Stage from "./components/Stage";
import { BackWall } from "./components/BackWall";
import { Pillar } from "./components/Pillar";
import { TopBeam } from "./components/TopBeam";
import { Curtain } from "./components/Curtain";
import { CurtainHeader } from "./components/CurtainHeader";
import { PresentationScreen } from "./components/PresentationScreen";
import { Presenter } from "./components/Presenter";
import { TheaterLighting } from "./components/TheaterLighting";
import { tierFor, TIERS } from "./helper/useResponsiveLayout";
import { sectionProgress } from "./helper/sectionProgress";
import { T } from "./timeline";
import { lowTier } from "./helper/quality";


function SceneFog() {
  const { size } = useThree();

  const { fogDensity } = TIERS[tierFor(size.width / size.height)];

  return <fogExp2 attach="fog" args={["#0b0809", fogDensity]} />;
}

function Theater({ progress }) {
  const { size } = useThree();

  const tier = tierFor(size.width / size.height);

  const { scale } = TIERS[tier];

  const screenLightRef = useRef();

  useFrame(() => {
    if (!screenLightRef.current) return;

    screenLightRef.current.intensity =
      8 * sectionProgress(progress, ...T.screenOn);
  });

  return (
    <group
      position={[0, -0.8, 0]}
      scale={scale}
    >
      <hemisphereLight args={["#46587a", "#120b07", 0.55]} />

      <directionalLight
        position={[-7, 6, 6]}
        intensity={0.5}
        color="#7f9ac4"
      />

      <pointLight
        position={[0, -0.15, 3.3]}
        intensity={9}
        color="#ff9a4d"
        distance={11}
        decay={2}
      />

      <pointLight
        ref={screenLightRef}
        position={[0, 3, 0.6]}
        intensity={0}
        color="#9fc4ff"
        distance={9}
        decay={2}
      />

      {!lowTier && (
        <spotLight
          position={[-7, 7.5, -5]}
          angle={0.7}
          penumbra={1}
          intensity={110}
          distance={22}
          decay={2}
          color="#4f7ad6"
        />
      )}

      <TheaterLighting progress={progress} />

      <Stage />
      <BackWall />

      <Pillar position={[-5.2, 3, -2.5]} />
      <Pillar position={[5.2, 3, -2.5]} />

      <TopBeam />

      <CurtainHeader />

      <Curtain
        side="left"
        progress={progress}
      />

      <Curtain
        side="right"
        progress={progress}
      />

      <PresentationScreen
        progress={progress}
      />

      <Presenter
        progress={progress}
      />
    </group>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  useEffect(() => {
    let scrollHeight = 0;

    const measure = () => {
      const viewport =
        window.visualViewport?.height ?? window.innerHeight;

      scrollHeight =
        document.documentElement.scrollHeight - viewport;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scaledProgress =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 1.30
          : 0;

      setTargetProgress(Math.min(scaledProgress, 1.30));
    };

    const handleResize = () => {
      measure();
      handleScroll();
    };

    measure();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    let animationFrame;

    const smoothProgress = () => {
      setProgress((current) => {
        const difference = targetProgress - current;

        if (Math.abs(difference) < 0.0001) {
          return targetProgress;
        }

        return current + difference * 0.08;
      });

      animationFrame =
        requestAnimationFrame(smoothProgress);
    };

    animationFrame =
      requestAnimationFrame(smoothProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetProgress]);

  return (
    <div
      style={{
        width: "100%",
        height: "900vh",

        background: `
      linear-gradient(
        rgba(0, 0, 0, 0.78),
        rgba(1, 1, 1, 0.92)
      ),
      url("/textures/bg.png")
      center / cover fixed
    `,
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "transparent"
        }}
      >
        <Canvas
          shadows="percentage"
          dpr={[1, 1.75]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.AgXToneMapping,
            toneMappingExposure: 1.3,
          }}
        >
          <SceneFog />

          <ResponsiveCamera progress={progress} />

          <Theater progress={progress} />
        </Canvas>
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default App;
