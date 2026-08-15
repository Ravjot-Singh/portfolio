import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Presenter({ progress }) {

  const presenterRef = useRef();

  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const targetX = 0;

  useFrame((state, delta) => {
    if (!presenterRef.current) return;

    const walkStart = 0.12;
    const walkEnd = 0.47;

    const walkProgress = THREE.MathUtils.clamp(
      (progress - walkStart) /
      (walkEnd - walkStart),
      0,
      1
    );

    const eased = THREE.MathUtils.smoothstep(
      walkProgress,
      0,
      1
    );

    // Position
    presenterRef.current.position.x =
      THREE.MathUtils.lerp(
        -6,
        3.1,
        eased
      );

    const walking =
      progress > walkStart &&
      progress < walkEnd;

    if (walking) {
      const walk = Math.sin(
        state.clock.elapsedTime * 8
      );

      leftArmRef.current.rotation.z =
        walk * 0.25;

      rightArmRef.current.rotation.z =
        -walk * 0.25;

      leftLegRef.current.rotation.z =
        -walk * 0.12;

      rightLegRef.current.rotation.z =
        walk * 0.12;
    } else {
      leftArmRef.current.rotation.z =
        THREE.MathUtils.lerp(
          leftArmRef.current.rotation.z,
          0,
          5 * delta
        );

      rightArmRef.current.rotation.z =
        THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          0,
          5 * delta
        );

      leftLegRef.current.rotation.z =
        THREE.MathUtils.lerp(
          leftLegRef.current.rotation.z,
          0,
          5 * delta
        );

      rightLegRef.current.rotation.z =
        THREE.MathUtils.lerp(
          rightLegRef.current.rotation.z,
          0,
          5 * delta
        );
    }
  });

  return (
    <group
      ref={presenterRef}
      position={[-4.9, 0.4, 0.1]}
    >
      {/* Head */}
      <mesh
        position={[0, 2.4, 0]}
        castShadow
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#d69b76" />
      </mesh>

      {/* Graduation Cap */}

      {/* Cap base / crown */}
      <mesh
        position={[0, 2.70, 0]}
        castShadow
      >
        <boxGeometry args={[0.58, 0.19, 0.58]} />
        <meshStandardMaterial
          color="#323131"
          roughness={0.7}
        />
      </mesh>

      {/* Flat square top */}
      <mesh
        position={[0, 2.85, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.82, 0.09, 0.82]} />
        <meshStandardMaterial
          color="#323232"
          roughness={0.65}
        />
      </mesh>

      {/* Tassel */}
      <mesh
        position={[0.4, 2.78, 0.1]}
        castShadow
      >
        <cylinderGeometry
          args={[0.03, 0.03, 0.22, 12]}
        />
        <meshStandardMaterial
          color="#d6b45a"
          metalness={0.25}
          roughness={0.5}
        />
      </mesh>

      {/* Tassel end */}
      <mesh
        position={[0.41, 2.60, 0.05]}
        castShadow
      >
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color="#d6b45a"
          metalness={0.25}
          roughness={0.5}
        />
      </mesh>

      {/* Neck */}
      <mesh
        position={[0, 2.02, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.12, 0.25, 16]} />
        <meshStandardMaterial color="#d69b76" />
      </mesh>

      {/* Body */}
      <mesh
        position={[0, 1.4, 0]}
        castShadow
      >
        <boxGeometry args={[0.75, 1.2, 0.45]} />
        <meshStandardMaterial color="#1a1919" />
      </mesh>

      {/* Left Jacket Lapel */}
      <mesh
        position={[-0.20, 1.72, 0.245]}
        rotation={[0, 0, -0.35]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.55, 0.05]} />
        <meshStandardMaterial color="#292727" />
      </mesh>


      {/* Right Jacket Lapel */}
      <mesh
        position={[0.20, 1.72, 0.245]}
        rotation={[0, 0, 0.35]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.55, 0.05]} />
        <meshStandardMaterial color="#292727" />
      </mesh>

      {/* Left Arm */}
      <group
        ref={leftArmRef}
        position={[-0.48, 1.85, 0.15]}
      >
        <mesh
          position={[0, -0.5, 0]}
          castShadow
        >
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial color="#1a1919" />
        </mesh>

        {/* Hand */}
        <mesh
          position={[0, -1.02, 0]}
          castShadow
        >
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#d69b76" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group
        ref={rightArmRef}
        position={[0.48, 1.85, 0.15]}
      >
        <mesh
          position={[0, -0.5, 0]}
          castShadow
        >
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial color="#1a1919" />
        </mesh>

        {/* Hand */}
        <mesh
          position={[0, -1.02, 0]}
          castShadow
        >
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#d69b76" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group
        ref={leftLegRef}
        position={[-0.2, 0.85, 0]}
      >
        <mesh
          position={[0, -0.45, 0]}
          castShadow
        >
          <boxGeometry args={[0.25, 0.9, 0.3]} />
          <meshStandardMaterial color="#151515" />
        </mesh>

        {/* Shoe */}
        <mesh
          position={[0, -0.92, 0.08]}
          castShadow
        >
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial color="#080808" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group
        ref={rightLegRef}
        position={[0.2, 0.85, 0]}
      >
        <mesh
          position={[0, -0.45, 0]}
          castShadow
        >
          <boxGeometry args={[0.25, 0.9, 0.3]} />
          <meshStandardMaterial color="#151515" />
        </mesh>

        {/* Shoe */}
        <mesh
          position={[0, -0.92, 0.08]}
          castShadow
        >
          <boxGeometry args={[0.3, 0.15, 0.5]} />
          <meshStandardMaterial color="#080808" />
        </mesh>


      </group>
    </group>
  );
}