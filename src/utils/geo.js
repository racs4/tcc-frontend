export function getMiddlePoint(p0, p1) {
  const [x0, y0] = p0;
  const [x1, y1] = p1;

  const xMid = x0 + (x1 - x0) * 0.5;
  const yMid = y0 + (y1 - y0) * 0.5;
  return [xMid, yMid];
}

export function getDistancePoints(p0, p1) {
  const [x0, y0] = p0;
  const [x1, y1] = p1;

  if (x0 === x1) return Math.abs(y1 - y0);
  else if (y0 === y1) return Math.abs(x1 - x0);
  else return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}
