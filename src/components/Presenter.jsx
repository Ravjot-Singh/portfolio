import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { T, presenterX, PRESENTER_START_X } from "../timeline";

const STRIDE_PER_UNIT = 2.2;

const FACE_WALKING = 0.5;
const FACE_RESTING = -0.28;

const BASE_Z = -0.1;

const BASE_Y = -0.23;

export function Presenter({ progress }) {

  const presenterRef = useRef();
  const torsoRef = useRef();
  const headRef = useRef();
  const tasselRef = useRef();

  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const phase = useRef(0);
  const previousX = useRef(PRESENTER_START_X);

  const tasselAngle = useRef(0);
  const tasselVelocity = useRef(0);

  useFrame((state, delta) => {
    if (!presenterRef.current) return;

    const step = Math.min(delta, 1 / 30);
    const time = state.clock.elapsedTime;

    const x = presenterX(progress);

    const travelled = x - previousX.current;

    previousX.current = x;

    presenterRef.current.position.x = x;

    const walking =
      progress > T.presenter[0] &&
      progress < T.presenter[1] &&
      Math.abs(travelled) > 1e-5;

    phase.current += Math.abs(travelled) * STRIDE_PER_UNIT;

    const walk = Math.sin(phase.current);

    presenterRef.current.rotation.y = THREE.MathUtils.damp(
      presenterRef.current.rotation.y,
      walking ? FACE_WALKING : FACE_RESTING,
      3,
      step
    );

    if (walking) {
      leftLegRef.current.rotation.x = walk * 0.45;
      rightLegRef.current.rotation.x = -walk * 0.45;

      leftArmRef.current.rotation.x = -walk * 0.35;
      rightArmRef.current.rotation.x = walk * 0.35;

      leftArmRef.current.rotation.z = walk * 0.08;
      rightArmRef.current.rotation.z = -walk * 0.08;

      presenterRef.current.position.y =
        BASE_Y + Math.abs(Math.sin(phase.current)) * 0.035;

      if (torsoRef.current) {
        torsoRef.current.scale.set(1, 1, 1);
      }
    } else {
      for (const limb of [leftArmRef, rightArmRef, leftLegRef, rightLegRef]) {
        limb.current.rotation.x = THREE.MathUtils.damp(
          limb.current.rotation.x,
          0,
          5,
          step
        );

        limb.current.rotation.z = THREE.MathUtils.damp(
          limb.current.rotation.z,
          0,
          5,
          step
        );
      }

      const breath = Math.sin(time * 1.6);

      if (torsoRef.current) {
        torsoRef.current.scale.y = 1 + breath * 0.012;
        torsoRef.current.scale.z = 1 + breath * 0.018;
      }

      presenterRef.current.position.y = BASE_Y + breath * 0.016;

      presenterRef.current.rotation.z = Math.sin(time * 0.35) * 0.022;
      presenterRef.current.position.x =
        x + Math.sin(time * 0.27) * 0.03;

      leftArmRef.current.rotation.x += Math.sin(time * 0.8) * 0.03;
      rightArmRef.current.rotation.x += Math.sin(time * 0.8 + 2.1) * 0.03;

      if (headRef.current) {
        const glance = -0.22 + Math.sin(time * 0.23) * 0.10;

        headRef.current.rotation.y = THREE.MathUtils.damp(
          headRef.current.rotation.y,
          glance,
          2,
          step
        );

        headRef.current.rotation.x = Math.sin(time * 0.19) * 0.05;
      }
    }

    if (tasselRef.current) {
      const acceleration = travelled / Math.max(step, 1e-4);

      tasselVelocity.current +=
        (-40 * tasselAngle.current -
          7 * tasselVelocity.current -
          18 * acceleration) *
        step;

      tasselAngle.current += tasselVelocity.current * step;

      tasselRef.current.rotation.z = THREE.MathUtils.clamp(
        tasselAngle.current,
        -0.6,
        0.6
      );
    }
  });

  return (
    <group
      ref={presenterRef}
      position={[PRESENTER_START_X, BASE_Y, BASE_Z]}
    >
      <group ref={headRef} position={[0, 2.4, 0]}>

        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#d69b76"
            roughness={0.68}
          />
        </mesh>

        <mesh position={[0, 0.30, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.19, 0.58]} />
          <meshStandardMaterial
            color="#323131"
            roughness={0.7}
          />
        </mesh>

        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.09, 0.82]} />
          <meshStandardMaterial
            color="#323232"
            roughness={0.65}
          />
        </mesh>

        <group ref={tasselRef} position={[0.40, 0.46, 0.10]}>
          <mesh position={[0, -0.08, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
            <meshStandardMaterial
              color="#d6b45a"
              metalness={0.65}
              roughness={0.35}
            />
          </mesh>

          <mesh position={[0.01, -0.26, -0.05]} castShadow>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color="#d6b45a"
              metalness={0.65}
              roughness={0.35}
            />
          </mesh>
        </group>

      </group>

      <mesh position={[0, 2.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.25, 16]} />
        <meshStandardMaterial
          color="#d69b76"
          roughness={0.68}
        />
      </mesh>

      <group ref={torsoRef} position={[0, 1.4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.75, 1.2, 0.45]} />
          <meshStandardMaterial
            color="#17171a"
            roughness={0.62}
            metalness={0.03}
          />
        </mesh>

        <mesh
          position={[-0.20, 0.32, 0.245]}
          rotation={[0, 0, -0.35]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 0.55, 0.05]} />
          <meshStandardMaterial
            color="#202024"
            roughness={0.42}
          />
        </mesh>

        <mesh
          position={[0.20, 0.32, 0.245]}
          rotation={[0, 0, 0.35]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 0.55, 0.05]} />
          <meshStandardMaterial
            color="#202024"
            roughness={0.42}
          />
        </mesh>
      </group>

      <group
        ref={leftArmRef}
        position={[-0.48, 1.85, 0.15]}
      >
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial
            color="#17171a"
            roughness={0.62}
            metalness={0.03}
          />
        </mesh>

        <mesh position={[0, -1.02, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#d69b76"
            roughness={0.68}
          />
        </mesh>
      </group>

      <group
        ref={rightArmRef}
        position={[0.48, 1.85, 0.15]}
      >
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial
            color="#17171a"
            roughness={0.62}
            metalness={0.03}
          />
        </mesh>

        <mesh position={[0, -1.02, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#d69b76"
            roughness={0.68}
          />
        </mesh>
      </group>

      <group
        ref={leftLegRef}
        position={[-0.2, 0.85, 0]}
      >
        <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.9, 0.3]} />
          <meshStandardMaterial
            color="#151515"
            roughness={0.62}
          />
        </mesh>

        <mesh position={[0, -0.92, 0.08]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial
            color="#0a0a0c"
            roughness={0.18}
            metalness={0.10}
          />
        </mesh>
      </group>

      <group
        ref={rightLegRef}
        position={[0.2, 0.85, 0]}
      >
        <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.9, 0.3]} />
          <meshStandardMaterial
            color="#151515"
            roughness={0.62}
          />
        </mesh>

        <mesh position={[0, -0.92, 0.08]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial
            color="#0a0a0c"
            roughness={0.18}
            metalness={0.10}
          />
        </mesh>
      </group>
    </group>
  );
}
