import { useState } from "react";
import Instructions from "../instructions/Instructions";
import ColorFinder from "../../components/color-finder/ColorFinder";
import {
  getDistanceColors,
  getDistanceLuminanceColors,
  getMiddleLabColor,
  getMiddleLuminanceColors,
} from "../../utils/lab";
import { fetchUrl } from "../../fetch";
import ImageSubstitution from "../image-substitution/ImageSubstitution";

export default function ICD({}) {
  const [actualScreen, setActualScreen] = useState(0);
  const [points, setPoints] = useState([]);

  const whenAdvance = () => {
    if (actualScreen < screens.length - 1) {
      setActualScreen(actualScreen + 1);
    } else {
      fetchUrl("/ellipse", {
        method: "POST",
        data: {
          points,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const storePoints = (colorPoint) => {
    const [L, u, v] = colorPoint;
    setPoints([...points, [u, v]]);
  };

  const screens = [
    <Instructions whenAdvance={whenAdvance} />,
    ...COLORS.map((color, i) => (
      <ColorFinder
        key={i}
        initMin={BASE_COLOR}
        initMax={color}
        whenAdvance={whenAdvance}
        findDistanceColors={
          i < 6 ? getDistanceColors : getDistanceLuminanceColors
        }
        findMiddleColor={i < 6 ? getMiddleLabColor : getMiddleLuminanceColors}
        storePoints={storePoints}
      />
    )),
    // <ImageSubstitution />,
  ];

  return <main className="font-mono">{screens[actualScreen]}</main>;
}

const BASE_COLOR = [50, 0, 0];

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

const PROTANOPE_CONFUSION = [50, 298.0697, 21.5816];
const DEUTERANOPE_CONFUSION = [50, -121.7, 78.2];
const TRITANOPE_CONFUSION = [50, 25.7, 0];

const PROTANOPE_CONFUSION_AWAY = [50, -298.0697, -21.5816];
const DEUTERANOPE_CONFUSION_AWAY = [50, 121.7, -78.2];
const TRITANOPE_CONFUSION_AWAY = [50, -25.7, 0];

const MAX_LUMINANCE = [100, 0, 0];
const MIN_LUMINANCE = [0, 0, 0];

const COLORS = [
  PROTANOPE_CONFUSION,
  PROTANOPE_CONFUSION_AWAY,
  DEUTERANOPE_CONFUSION,
  DEUTERANOPE_CONFUSION_AWAY,
  TRITANOPE_CONFUSION,
  TRITANOPE_CONFUSION_AWAY,
  MAX_LUMINANCE,
  MIN_LUMINANCE,
];
