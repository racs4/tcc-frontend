import { getDistancePoints, getMiddlePoint } from "./geo";

export function getMiddleLabColor(colorA, colorB) {
  const [lA, aA, bA] = colorA;
  const [lB, aB, bB] = colorB;

  // if (lA !== lB) throw "Color luminance doesn't match";
  // else
  return [lA, ...getMiddlePoint([aA, bA], [aB, bB]).map(Math.floor)];
}

export function getDistanceColors(colorA, colorB) {
  const [lA, aA, bA] = colorA;
  const [lB, aB, bB] = colorB;

  // if (lA !== lB) throw "Color luminance doesn't match";
  // else
  return getDistancePoints([aA, bA], [aB, bB]);
}

export function getDistanceLuminanceColors(colorA, colorB) {
  const [lA, aA, bA] = colorA;
  const [lB, aB, bB] = colorB;

  return Math.abs(lA - lB);
}

export function getMiddleLuminanceColors(colorA, colorB) {
  const [lA, aA, bA] = colorA;
  const [lB, aB, bB] = colorB;

  return [(lA + lB) / 2, aA, aB];
}
