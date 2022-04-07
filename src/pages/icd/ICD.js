import { useState } from "react";
import { fetchUrl } from "../../fetch";
import {
  getDistanceColors,
  getDistanceLuminanceColors,
  getMiddleLabColor,
  getMiddleLuminanceColors,
} from "../../utils/lab";
import { BASE_COLOR, CIRCLE, COLORS } from "../../utils/col";

import Instructions from "../instructions/Instructions";
import ColorFinder from "../../components/color-finder/ColorFinder";
import ImageSubstitution from "../image-substitution/ImageSubstitution";

export default function ICD({}) {
  const [actualScreen, setActualScreen] = useState(0);
  const [points, setPoints] = useState([]);
  const [luminances, setLuminances] = useState([]);

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

  const storeLuminances = (colorLuminance) => {
    const [L, u, v] = colorLuminance;
    setLuminances([...luminances, L]);
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
        storePoints={i < 6 ? storePoints : storeLuminances}
      />
    )),
    <ImageSubstitution
      points={points}
      luminances={luminances}
      circle={CIRCLE}
    />,
  ];

  return <main className="font-mono">{screens[actualScreen]}</main>;
}
