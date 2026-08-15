import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { fadeInOut } from "../helper/fadeInOut.js";
import { sectionProgress } from "../helper/sectionProgress.js";
import { AboutCrawl } from "./AboutCrawl";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectSection";
import { JourneySection } from "./JourneySection";
import { ContactSection } from "./ContactSection";


export function PresentationScreen({ progress }) {
  const welcomeRef = useRef();
  const nameRef = useRef();
  const subtitleRef = useRef();


  useFrame(() => {

    const welcomeOpacity = fadeInOut(progress, 0.30, 0.50);

    const nameOpacity =
      progress >= 0.34 && progress < 0.50
        ? fadeInOut(progress, 0.34, 0.51)
        : 0;

    const subtitleOpacity = fadeInOut(
      progress,
      0.38,
      0.52
    );


    if (welcomeRef.current) {
      welcomeRef.current.visible = progress < 0.52;

      welcomeRef.current.material.opacity = welcomeOpacity;
      welcomeRef.current.fillOpacity = welcomeOpacity;
      welcomeRef.current.outlineOpacity = welcomeOpacity;
    }

    if (nameRef.current) {
      nameRef.current.visible = progress < 0.52;

      nameRef.current.material.opacity = nameOpacity;
      nameRef.current.fillOpacity = nameOpacity;
      nameRef.current.outlineOpacity = nameOpacity;

      nameRef.current.position.y =
        0.2 +
        THREE.MathUtils.lerp(
          -0.3,
          0,
          nameOpacity
        );
    }

    if (subtitleRef.current) {
      subtitleRef.current.visible = progress < 0.52;

      subtitleRef.current.material.opacity = subtitleOpacity;
      subtitleRef.current.fillOpacity = subtitleOpacity;
      subtitleRef.current.outlineOpacity = subtitleOpacity;
    }



  });

  return (
    <group position={[0, 3, -2]}>

      {/* Frame */}

      <mesh>
        <boxGeometry
          args={[8, 4.7, 0.3]}
        />

        <meshStandardMaterial
          color="#2a1710"
          roughness={0.65}
        />
      </mesh>

      {/* Screen */}

      <mesh position={[0, 0, 0.18]}>
        <boxGeometry
          args={[7.4, 4.1, 0.05]}
        />

        <meshStandardMaterial
          color="#080808"
          roughness={0.35}
        />
      </mesh>


      <Text
        ref={welcomeRef}
        position={[0, 1, 0.30]}
        fontSize={0.28}
        letterSpacing={0.12}
        color="#b8b8b8"
        anchorX="center"
        anchorY="middle"
        transparent
        depthWrite={false}
        depthTest={false}
      >
        WELCOME
      </Text>


      <Text
        ref={nameRef}
        position={[0, 0.2, 0.32]}
        fontSize={0.7}
        color="white"
        outlineWidth={0.015}
        outlineColor="#000000"
        anchorX="center"
        anchorY="middle"
        transparent
        depthWrite={false}
        depthTest={false}
      >
        I'm Ravjot Singh
      </Text>


      <Text
        ref={subtitleRef}
        position={[0, -0.6, 0.34]}
        fontSize={0.28}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        transparent
        depthWrite={false}
        depthTest={false}
      >
        Computer Science Engineer
      </Text>

      <AboutCrawl progress={progress} />

      <SkillsSection progress={progress} />

      <ProjectsSection progress={progress} />

      <JourneySection progress={progress} />

      <ContactSection progress={progress} />

    </group>
  );
}