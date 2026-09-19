export const lowTier =
  typeof window !== "undefined" &&
  (window.innerWidth < 768 ||
    (navigator.hardwareConcurrency ?? 8) <= 4);

export const shadowMapSize = lowTier ? 1024 : 2048;
