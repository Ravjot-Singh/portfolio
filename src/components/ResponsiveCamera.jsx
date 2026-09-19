import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { tierFor, TIERS } from "../helper/useResponsiveLayout";
import { sectionProgress } from "../helper/sectionProgress";
import { smootherstep } from "../helper/easing";

const FILL_MARGIN = 1.12;

const DOLLY_IN = [0.30, 0.38];
const DOLLY_OUT = [1.26, 1.30];

export function ResponsiveCamera({ progress }) {
  const { camera, size } = useThree();

  const pose = useRef({
    baseY: 1.5,
    baseZ: 16,
    closeY: 1.5,
    closeZ: 16,
  });

  const initialised = useRef(false);

  useEffect(() => {
    const aspect = size.width / size.height;

    const { baseY, baseZ, fov, scale, dolly } =
      TIERS[tierFor(aspect)];

    const screenWidth = 7.4 * scale;
    const screenHeight = 4.1 * scale;
    const screenZ = -2 * scale;

    const frustum =
      2 * Math.tan((fov * Math.PI) / 180 / 2);

    const distance = Math.max(
      (screenWidth * FILL_MARGIN) / (frustum * aspect),
      (screenHeight * FILL_MARGIN) / frustum
    );

    const screenCentreY = -0.8 + 3 * scale;

    pose.current = {
      baseY,
      baseZ,
      closeZ: THREE.MathUtils.lerp(baseZ, screenZ + distance, dolly),
      closeY: THREE.MathUtils.lerp(baseY, screenCentreY, dolly),
    };

    camera.fov = fov;
    camera.updateProjectionMatrix();

    if (!initialised.current) {
      camera.position.set(0, baseY, baseZ);
      initialised.current = true;
    }
  }, [camera, size]);

  useFrame((state, delta) => {
    const { baseY, baseZ, closeY, closeZ } = pose.current;

    const dolly =
      smootherstep(sectionProgress(progress, ...DOLLY_IN)) *
      (1 - smootherstep(sectionProgress(progress, ...DOLLY_OUT)));

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      THREE.MathUtils.lerp(baseY, closeY, dolly),
      4,
      delta
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      THREE.MathUtils.lerp(baseZ, closeZ, dolly),
      4,
      delta
    );
  });

  return null;
}
