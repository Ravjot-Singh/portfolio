import * as THREE from "three";

export function fadeInOut(progress, start, end, inFrac, outFrac) {
  const range = end - start;

  if (range <= 0) return 0;

  const defaultLength = Math.min(0.08, range / 2);

  const inLength =
    inFrac != null ? range * inFrac : defaultLength;

  const outLength =
    outFrac != null ? range * outFrac : defaultLength;

  const fadeIn = THREE.MathUtils.smoothstep(
    progress,
    start,
    start + inLength
  );

  const fadeOut = 1 - THREE.MathUtils.smoothstep(
    progress,
    end - outLength,
    end
  );

  return fadeIn * fadeOut;
}
