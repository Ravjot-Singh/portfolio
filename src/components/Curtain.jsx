import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { T } from "../timeline";
import { sectionProgress } from "../helper/sectionProgress";

const FOLDS = 30;
const WIDTH = 4.8;
const FOLD_WIDTH = WIDTH / FOLDS;

const HEIGHT = 6.4;
const CENTRE_Y = 2.8;

const SPRING_K = 26;
const SPRING_C = 7;

const FOLD_LAG = 0.06;

export function Curtain({ side, progress }) {
  const foldRefs = useRef([]);
  const hemRef = useRef();
  const backingRef = useRef();

  const amount = useRef(0);
  const velocity = useRef(0);

  const sideDirection = side === "left" ? 1 : -1;

  const closedX = side === "left" ? -4.7 : 4.7;
  const openX = side === "left" ? -5.3 : 5.3;

  const foldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#4a0f0f",
        roughness: 0.75,
        metalness: 0,
        sheen: 1,
        sheenRoughness: 0.45,
        sheenColor: new THREE.Color("#ff6a55"),
      }),
    []
  );

  useFrame((state, delta) => {
    const step = Math.min(delta, 1 / 30);

    const opening = THREE.MathUtils.smoothstep(
      sectionProgress(progress, ...T.curtainOpen),
      0,
      1
    );

    const closing = THREE.MathUtils.smoothstep(
      sectionProgress(progress, ...T.curtainClose),
      0,
      1
    );

    const target = opening * (1 - closing);

    velocity.current +=
      (SPRING_K * (target - amount.current) -
        SPRING_C * velocity.current) *
      step;

    amount.current += velocity.current * step;

    const settled = amount.current;

    for (let index = 0; index < FOLDS; index++) {
      const mesh = foldRefs.current[index];

      if (!mesh) continue;

      const t = index / (FOLDS - 1);

      const local = THREE.MathUtils.clamp(
        settled - t * FOLD_LAG,
        0,
        1
      );

      const centerX = THREE.MathUtils.lerp(
        closedX,
        openX,
        local
      );

      const gatherFactor = THREE.MathUtils.lerp(1, 0.12, local);

      const gatheredOffset =
        index * FOLD_WIDTH * sideDirection * gatherFactor;

      const curlZ = Math.sin(t * Math.PI) * 1.15 * local;

      const fold =
        Math.sin((index / FOLDS) * Math.PI * 8) * 0.08;

      mesh.position.set(
        centerX + gatheredOffset,
        CENTRE_Y,
        0.6 + fold + curlZ
      );

      mesh.rotation.y =
        -Math.PI / 2 +
        (t - 0.5) * 1.15 * local * sideDirection;
    }

    const centerX = THREE.MathUtils.lerp(closedX, openX, settled);

    const gatherFactor = THREE.MathUtils.lerp(1, 0.12, settled);

    const spanCentreX =
      centerX +
      ((FOLDS - 1) / 2) * FOLD_WIDTH * sideDirection * gatherFactor;

    if (hemRef.current) {
      hemRef.current.position.x = spanCentreX;
      hemRef.current.scale.x = gatherFactor;
    }

    if (backingRef.current) {
      backingRef.current.position.x = spanCentreX;
      backingRef.current.scale.x = gatherFactor;
    }
  });

  return (
    <group>

      {Array.from({ length: FOLDS }).map((_, index) => (
        <mesh
          key={index}
          ref={(node) => (foldRefs.current[index] = node)}
          material={foldMaterial}
          position={[closedX, CENTRE_Y, 0.6]}
          castShadow={index % 2 === 0}
          receiveShadow
        >
          <cylinderGeometry
            args={[
              FOLD_WIDTH * 0.45,
              FOLD_WIDTH * 0.70,
              HEIGHT,
              8,
              1,
              false,
              0,
              Math.PI,
            ]}
          />
        </mesh>
      ))}

      <mesh
        ref={backingRef}
        position={[closedX, CENTRE_Y, 0.49]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[WIDTH, HEIGHT, 0.06]} />
        <meshStandardMaterial
          color="#3d0c0c"
          roughness={0.85}
        />
      </mesh>

      <mesh
        ref={hemRef}
        position={[closedX, -0.33, 0.72]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[WIDTH, 0.14, 0.34]} />
        <meshStandardMaterial
          color="#2e0a0a"
          roughness={0.7}
        />
      </mesh>

    </group>
  );
}
