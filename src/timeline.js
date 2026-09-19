import * as THREE from "three";

export const TIMELINE_END = 1.30;

export const T = {
  curtainOpen: [0.00, 0.30],
  presenter: [0.12, 0.47],
  screenOn: [0.22, 0.40],
  welcome: [0.30, 0.52],
  about: [0.52, 0.68],
  skills: [0.68, 0.90],
  projects: [0.90, 1.06],
  journey: [1.06, 1.19],
  contact: [1.19, 1.30],
  curtainClose: [1.25, 1.30],
};

export const PROJECT_SLIDES = (() => {
  const [start, end] = T.projects;
  const slide = (end - start) / 3;

  const fade = slide * 0.18;

  return [0, 1, 2].map((i) => {
    const from = start + slide * i;
    const to = from + slide;

    return {
      start: from,
      end: to,
      enterFrom: i === 0 ? start : from - fade,
      enterTo: i === 0 ? start + fade * 2 : from + fade,
      exitFrom: i === 2 ? end - fade * 2 : to - fade,
      exitTo: i === 2 ? end : to + fade,
    };
  });
})();

export const PRESENTER_START_X = -6;
export const PRESENTER_REST_X = 3.1;

export function presenterX(progress) {
  const t = THREE.MathUtils.clamp(
    (progress - T.presenter[0]) /
    (T.presenter[1] - T.presenter[0]),
    0,
    1
  );

  const eased = t * t * t * (t * (t * 6 - 15) + 10);

  return THREE.MathUtils.lerp(
    PRESENTER_START_X,
    PRESENTER_REST_X,
    eased
  );
}

if (import.meta.env?.DEV) {
  const chain = [
    ["about", "skills"],
    ["skills", "projects"],
    ["projects", "journey"],
    ["journey", "contact"],
  ];

  for (const [a, b] of chain) {
    if (T[a][1] !== T[b][0]) {
      console.error(
        `timeline.js: gap between ${a} (ends ${T[a][1]}) and ${b} ` +
        `(starts ${T[b][0]}). The screen will go blank between them.`
      );
    }
  }

  if (T.contact[1] !== TIMELINE_END) {
    console.error(
      `timeline.js: contact ends at ${T.contact[1]} but the timeline ` +
      `runs to ${TIMELINE_END}. The tail will be empty.`
    );
  }
}
