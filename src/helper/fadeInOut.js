import * as THREE from "three";

export function fadeInOut(progress, start, end) {
  const fadeLength = Math.min(
    0.08,
    (end - start) / 2
  );

  const fadeIn = THREE.MathUtils.smoothstep(
    progress,
    start,
    start + fadeLength
  );

  const fadeOut = 1 - THREE.MathUtils.smoothstep(
    progress,
    end - fadeLength,
    end
  );

  return fadeIn * fadeOut;
}