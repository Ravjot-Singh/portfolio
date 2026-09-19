export function smootherstep(t) {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;

  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function easeOutCubic(t) {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;

  return 1 - Math.pow(1 - x, 3);
}
