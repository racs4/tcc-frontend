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

const PROTANOPE_CONFUSION = [50, 0.678, 0.501];
const DEUTERANOPE_CONFUSION = [50, -1.217, 0.782];
const TRITANOPE_CONFUSION = [50, 0.257, 0.0];

const PROTANOPE_CONFUSION_AWAY = [50, -1.102, 0.380];
const DEUTERANOPE_CONFUSION_AWAY = [50, 0.620, 0.375];
const TRITANOPE_CONFUSION_AWAY = [50, 0.031, 1.786];

const MAX_LUMINANCE = [100, 0.19783982482140777, 0.46833630293240974];
const MIN_LUMINANCE = [0, 0.19783982482140777, 0.46833630293240974];

export const COLORS = [
  PROTANOPE_CONFUSION,
  PROTANOPE_CONFUSION_AWAY,
  DEUTERANOPE_CONFUSION,
  DEUTERANOPE_CONFUSION_AWAY,
  TRITANOPE_CONFUSION,
  TRITANOPE_CONFUSION_AWAY,
  MAX_LUMINANCE,
  MIN_LUMINANCE,
];

// generated in geogebra
export const CIRCLE = {
  t1: -0.2393954889781,
  t2: 0.844517965788,
  radius: Math.sqrt(0.9596190760166),
};
