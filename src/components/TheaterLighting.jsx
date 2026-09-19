import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { T, presenterX } from "../timeline";
import { sectionProgress } from "../helper/sectionProgress";
import { smootherstep } from "../helper/easing";
import { lowTier, shadowMapSize } from "../helper/quality";

const KEY_INTENSITY = 280;
const KEY_ANGLE = 0.38;
const KEY_HEIGHT = 8;
const KEY_DEPTH = 6;

const KEY_TRAIL = 1.6;

const BEAM_LENGTH = 8.4;
const BEAM_RADIUS = Math.tan(KEY_ANGLE) * BEAM_LENGTH;

const BEAM_OPACITY = 0.018;

const DOWN = new THREE.Vector3(0, -1, 0);
const aim = new THREE.Vector3();
const lamp = new THREE.Vector3();

export function TheaterLighting({ progress }) {
  const spotlightRef = useRef();
  const targetRef = useRef();
  const beamRef = useRef();
  const beamMaterialRef = useRef();

  useFrame((state, delta) => {
    const spot = spotlightRef.current;
    const target = targetRef.current;

    if (!spot || !target) return;

    if (spot.target !== target) {
      spot.target = target;
    }

    const warmth = smootherstep(
      sectionProgress(progress, ...T.curtainOpen)
    );

    spot.intensity = THREE.MathUtils.damp(
      spot.intensity,
      KEY_INTENSITY * warmth,
      5,
      delta
    );

    const subjectX = presenterX(progress);

    spot.position.x = THREE.MathUtils.damp(
      spot.position.x,
      subjectX - KEY_TRAIL,
      5,
      delta
    );

    target.position.x = THREE.MathUtils.damp(
      target.position.x,
      subjectX,
      5,
      delta
    );

    target.position.y = 1.1;
    target.position.z = 0.4;

    if (beamRef.current && beamMaterialRef.current) {
      beamMaterialRef.current.opacity = BEAM_OPACITY * warmth;

      lamp.set(spot.position.x, KEY_HEIGHT, KEY_DEPTH);

      aim
        .copy(target.position)
        .sub(lamp)
        .normalize();

      beamRef.current.quaternion.setFromUnitVectors(DOWN, aim);

      beamRef.current.position
        .copy(lamp)
        .addScaledVector(aim, BEAM_LENGTH / 2);
    }
  });

  return (
    <>
      <spotLight
        ref={spotlightRef}
        position={[-4, KEY_HEIGHT, KEY_DEPTH]}
        angle={KEY_ANGLE}
        penumbra={0.55}
        intensity={0}
        distance={26}
        decay={2}
        color="#ffd9a8"
        castShadow
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02}
        shadow-camera-near={1.5}
        shadow-camera-far={24}
      />

      <object3D ref={targetRef} position={[-3, 1.35, 0.4]} />

      {!lowTier && (
        <mesh
          ref={beamRef}
          position={[-4, KEY_HEIGHT, KEY_DEPTH]}
        >
          <coneGeometry
            args={[BEAM_RADIUS, BEAM_LENGTH, 24, 1, true]}
          />

          <meshBasicMaterial
            ref={beamMaterialRef}
            color="#ffd9a8"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
            fog={false}
          />
        </mesh>
      )}
    </>
  );
}
