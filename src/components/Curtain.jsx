import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Curtain({ side, progress }) {

  const openingProgress = THREE.MathUtils.clamp(
    progress / 0.30,
    0,
    1
  );

  const closingProgress = THREE.MathUtils.clamp(
    (progress - 1.15) / 0.15,
    0,
    1
  );

  const easedOpening = THREE.MathUtils.smoothstep(
    openingProgress,
    0,
    1
  );

  const easedClosing = THREE.MathUtils.smoothstep(
    closingProgress,
    0,
    1
  );

  const curtainAmount =
    easedOpening * (1 - easedClosing);


  const sideDirection =
    side === "left" ? 1 : -1;

  const closedX =
    side === "left"
      ? -4.7
      : 4.7;

  const openX =
    side === "left"
      ? -5.3
      : 5.3;


  const folds = 30;
  const width = 4.8;
  const foldWidth = width / folds;

  const centerX = THREE.MathUtils.lerp(
    closedX,
    openX,
    curtainAmount
  );


  return (
    <group>

      {Array.from({ length: folds }).map(
        (_, index) => {

          const t =
            index / (folds - 1);


          const foldOffset =
            index * foldWidth * sideDirection;

          const gatherFactor =
            THREE.MathUtils.lerp(
              1,
              0.12,
              curtainAmount
            );

          const gatheredOffset =
            foldOffset * gatherFactor;

          const curveStrength =
            Math.sin(t * Math.PI);

          const curlZ =
            curveStrength *
            1.15 *
            curtainAmount;


          const rotationY =
            (t - 0.5) *
            1.15 *
            curtainAmount *
            sideDirection;

          const fold =
            Math.sin(
              (index / folds) *
              Math.PI *
              8
            ) * 0.08;


          const x =
            centerX +
            gatheredOffset;


          return (
            <mesh
              key={index}
              position={[
                x,
                3,
                0.6 + fold + curlZ
              ]}
              rotation={[
                0,
                rotationY,
                0
              ]}
              castShadow
              receiveShadow
            >

              <boxGeometry
                args={[
                  foldWidth,
                  6,
                  0.12
                ]}
              />

              <meshStandardMaterial
                color="#551515"
                roughness={0.75}
              />

            </mesh>
          );
        }
      )}

    </group>
  );
}