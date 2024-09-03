export const BASE_COLOR = [50, 0.19783982482140777, 0.46833630293240974];

// CIELUV COORDS
// https://sites.oxy.edu/clint/physio/article/cambridgecolourtesthandbook.pdf
// https://www.researchgate.net/publication/348080962_A_content-dependent_Daltonization_algorithm_for_colour_vision_deficiencies_based_on_lightness_and_chroma_information
// 0.678, 0.501
// -1.217, 0.782
// 0.257, 0

// xyY COORDS
// https://www.researchgate.net/figure/Copunctal-points-of-dichromate-confusion-lines_tbl1_228970453
// 0.7465, 0.2535
// 1.40, -0.40
// 0.1748, 0

/**
 * Protanope confusion point in CIELUV color space.
 */
const PROTANOPE_CONFUSION = [50, 0.678, 0.501];
/**
 * Deuteranope confusion point in CIELUV color space.
 */
const DEUTERANOPE_CONFUSION = [50, -1.217, 0.782];
/**
 * Tritanope confusion point in CIELUV color space.
 */
const TRITANOPE_CONFUSION = [50, 0.257, 0.0];

/**
 * Opposite protanope confusion point in CIELUV color space.
 */
const PROTANOPE_CONFUSION_AWAY = [50, -1.102, 0.38];
/**
 * Opposite deuteranope confusion point in CIELUV color space.
 */
const DEUTERANOPE_CONFUSION_AWAY = [50, 0.62, 0.375];
/**
 * Opposite tritanope confusion point in CIELUV color space.
 */
const TRITANOPE_CONFUSION_AWAY = [50, 0.031, 1.786];

/**
 * Maximum luminance point in CIELUV color space.
 */
const MAX_LUMINANCE = [100, 0.19783982482140777, 0.46833630293240974];
/**
 * Minimum luminance point in CIELUV color space.
 */
const MIN_LUMINANCE = [0, 0.19783982482140777, 0.46833630293240974];

/**
 * Array of color blindness simulation types and their names.
 */
export const COLORS = [
  [PROTANOPE_CONFUSION, "protanopia"],
  [PROTANOPE_CONFUSION_AWAY, "protanopia oposta"],
  [DEUTERANOPE_CONFUSION, "deuteranopia"],
  [DEUTERANOPE_CONFUSION_AWAY, "deuteranopia oposta"],
  [TRITANOPE_CONFUSION, "tritanopia"],
  [TRITANOPE_CONFUSION_AWAY, "tritanopia oposta"],
  [MAX_LUMINANCE, "luminância máxima"],
  [MIN_LUMINANCE, "luminância mínima"],
];

/**
 * Circle formed by the confusion points of the color blindness simulation types.
 * Generated in Geogebra.
 */
export const CIRCLE = {
  t1: -0.2393954889781,
  t2: 0.844517965788,
  radius: Math.sqrt(0.9596190760166),
};
