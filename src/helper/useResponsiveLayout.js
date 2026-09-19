import { useMemo } from "react";
import { useThree } from "@react-three/fiber";

export function tierFor(aspect) {
  if (aspect < 0.7) return "portrait";
  if (aspect < 1.1) return "tablet";

  return "desktop";
}

export const TIERS = {
  portrait: { baseY: 1.2, baseZ: 20, fov: 52, scale: 0.72, dolly: 0.95, fogDensity: 0.018 },
  tablet: { baseY: 1.5, baseZ: 19, fov: 48, scale: 0.86, dolly: 0.85, fogDensity: 0.022 },
  desktop: { baseY: 1.5, baseZ: 16, fov: 45, scale: 1.00, dolly: 0.35, fogDensity: 0.028 },
};

const DESKTOP = {
  about: {
    bodyFont: 0.22,
    maxWidth: 6.6,
    lineHeight: 1.26,
    scaleFrom: 0.97,
    scaleTo: 0.86,
    yFrom: 1.0,
    yTo: 1.55,
    tiltFrom: -0.06,
    tiltTo: -0.20,
  },
  skills: {
    colX: 1.9,
    colFont: 0.19,
    headingFont: 0.20,
    devFont: 0.16,
    devMaxWidth: 5.8,
  },
  projects: {
    techFont: 0.19,
    techMaxWidth: 6.4,
    splitTech: true,
    pointsFont: 0.23,
    pointsMaxWidth: 6.0,
  },
  journey: {
    twoBeats: false,
    colX: 1.66,
    colFont: 0.17,
    colMaxWidth: 2.6,
    colLineHeight: 1.30,
    certFont: 0.17,
    certMaxWidth: 5.5,
  },
  contact: {
    showMessage: true,
    titleFont: 0.38,
    slots: [0.55, -0.425, -1.40],
    cardWidth: 390,
    cardHeight: 70,
    labelPx: 14,
    valuePx: 14,
  },
};

const TABLET = {
  ...DESKTOP,
  about: {
    ...DESKTOP.about,
    bodyFont: 0.225,
    maxWidth: 6.8,
    lineHeight: 1.24,
    scaleFrom: 0.96,
    scaleTo: 0.88,
    yFrom: 1.05,
    yTo: 1.45,
  },
  journey: {
    ...DESKTOP.journey,
    twoBeats: true,
    colFont: 0.19,
    colMaxWidth: 2.5,
    certFont: 0.19,
  },
  projects: { ...DESKTOP.projects, techFont: 0.195, techMaxWidth: 5.8 },
  contact: { ...DESKTOP.contact, valuePx: 15, labelPx: 14 },
};

const PORTRAIT = {
  about: {
    bodyFont: 0.235,
    maxWidth: 6.4,
    lineHeight: 1.22,
    scaleFrom: 0.95,
    scaleTo: 0.88,
    yFrom: 0.88,
    yTo: 1.12,
    tiltFrom: -0.04,
    tiltTo: -0.12,
  },
  skills: {
    colX: 1.45,
    colFont: 0.225,
    headingFont: 0.21,
    devFont: 0.215,
    devMaxWidth: 5.1,
  },
  projects: {
    techFont: 0.20,
    techMaxWidth: 5.1,
    splitTech: true,
    pointsFont: 0.24,
    pointsMaxWidth: 5.1,
  },
  journey: {
    twoBeats: true,
    colX: 1.30,
    colFont: 0.225,
    colMaxWidth: 2.35,
    colLineHeight: 1.26,
    certFont: 0.21,
    certMaxWidth: 5.1,
  },
  contact: {
    showMessage: false,
    titleFont: 0.30,
    slots: [0.795, -0.225, -1.245],
    cardWidth: 390,
    cardHeight: 72,
    labelPx: 15,
    valuePx: 17,
  },
};

const LAYOUTS = { portrait: PORTRAIT, tablet: TABLET, desktop: DESKTOP };

export function useResponsiveLayout() {
  const { size } = useThree();

  const tier = tierFor(size.width / size.height);

  return useMemo(
    () => ({ tier, ...LAYOUTS[tier], camera: TIERS[tier] }),
    [tier]
  );
}
