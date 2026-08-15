import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
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


function Theater({ progress }) {
  const { size } = useThree();

  const aspect = size.width / size.height;

  let scale = 1;

  if (aspect < 0.7) {
    scale = 0.72;
  } else if (aspect < 1.1) {
    scale = 0.86;
  }

  return (
    <group
      position={[0, -0.8, 0]}
      scale={scale}
    >

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const scaledProgress =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 1.30
          : 0;

      setTargetProgress(Math.min(scaledProgress, 1.30));
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      {/* Fixed theater */}
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
          shadows
          gl={{ alpha: true }}

        >
          <ResponsiveCamera />
          {/* Lighting */}

          <ambientLight intensity={0.8} />

          <directionalLight position={[1, 5, 3.2]} />

          <pointLight
            position={[0, 5, 3]}
            intensity={10}
            distance={10}
            decay={2}
          />

          {/* Theater */}
          <TheaterLighting progress={progress} />
          <Theater progress={progress} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;