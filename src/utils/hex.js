// https://www.codegrepper.com/code-examples/javascript/javascript+add+alpha+to+hex
/**
 * Add alpha to hex color
 * @param {string} color
 * @param {number} opacity
 * @returns {string} The color with the alpha value.
 */
export function addAlpha(color, opacity) {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
