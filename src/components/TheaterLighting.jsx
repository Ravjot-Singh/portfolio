import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TheaterLighting({ progress }) {
  const spotlightRef = useRef();
  const targetRef = useRef();

  useEffect(() => {
    if (
      spotlightRef.current &&
      targetRef.current
    ) {
      spotlightRef.current.target =
        targetRef.current;
    }
  }, []);

  useFrame((state, delta) => {
    if (
      !spotlightRef.current ||
      !targetRef.current
    ) {
      return;
    }

    const lightProgress =
      THREE.MathUtils.clamp(
        (progress - 0.00) / 0.96,
        0,
        1
      );

    const eased =
      THREE.MathUtils.smoothstep(
        lightProgress,
        0,
        1
      );

    const lightX =
      THREE.MathUtils.lerp(
        -4,
        3.1,
        eased
      );

    spotlightRef.current.position.x =
      THREE.MathUtils.lerp(
        spotlightRef.current.position.x,
        lightX,
        5 * delta
      );

    const targetX =
      THREE.MathUtils.lerp(
        -3,
        3.1,
        eased
      );

    targetRef.current.position.x =
      THREE.MathUtils.lerp(
        targetRef.current.position.x,
        targetX,
        5 * delta
      );

    targetRef.current.position.y =
      THREE.MathUtils.lerp(
        0.8,
        1.4,
        eased
      );

    targetRef.current.position.z = 0.5;

    const targetIntensity =
      THREE.MathUtils.lerp(
        0,
        6,
        eased
      );

    spotlightRef.current.intensity =
      THREE.MathUtils.lerp(
        spotlightRef.current.intensity,
        targetIntensity,
        5 * delta
      );
  });

  return (
    <>

      <ambientLight
        intensity={0.05}
      />


      <spotLight
        ref={spotlightRef}
        position={[-4, 8, 6]}
        angle={0.5}
        penumbra={0.65}
        intensity={0}
        distance={20}
        decay={2}
        castShadow
      />

      {/* Spotlight target */}

      <primitive
        ref={targetRef}
        object={new THREE.Object3D()}
      />
    </>
  );
}