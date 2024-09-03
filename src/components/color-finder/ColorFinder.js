import { useEffect, useState } from "react";
import convert from "color-convert";
import Image from "../../components/image/Image";
import Button from "../../components/button/Button";

import "./ColorFinder.css";

/**
 * @name ColorFinder
 *
 * @description
 * ColorFinder component is a reusable component that can be used to find colors in the application.
 *
 * @param {Object} params - The parameters of the color finder component.
 * @param {number} params.initMin - The initial minimum value.
 * @param {number} params.initMax - The initial maximum value.
 * @param {Function} params.whenAdvance - The function to be called when advancing.
 * @param {Function} params.findDistanceColors - The function to find the distance between colors.
 * @param {Function} params.findMiddleColor - The function to find the middle color.
 * @param {number} params.distanceMultiplier - The distance multiplier.
 * @param {Function} params.storePoints - The function to store points.
 * @param {string} params.title - The title.
 */
export default function ColorFinder({
  initMin,
  initMax,
  whenAdvance,
  findDistanceColors,
  findMiddleColor,
  distanceMultiplier,
  storePoints,
  title,
}) {
  console.log(initMax);
  const [min, setMin] = useState(initMin);
  const [max, setMax] = useState(initMax);

  // considering two decimal places
  const maxCount = Math.ceil(
    Math.log2(findDistanceColors(initMin, initMax) * distanceMultiplier)
  );
  const [count, setCount] = useState(0);

  // initiate direction with a random number
  // from 0 to 7, inclusive
  const [direction, setDirection] = useState(getRandomDirection());
  const [selectedDirection, setSelectedDirection] = useState(undefined);
  const [backgroundColor, setBackgroundColor] = useState(min);
  const [circleColor, setCircleColor] = useState(findMiddleColor(max, min));

  useEffect(() => {
    if (count >= maxCount) {
      storePoints(circleColor);
      whenAdvance();
    }
  }, [count]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen h-64 space-y-5">
        <p className="text-center w-full">
          {count} de {maxCount} feitos para {title}
        </p>
        {/* <p>
          <div style={{ width: "50px", height: "50px", background: "#"+convert["lu'v'"].hex(circleColor) }}></div>
          <div style={{ width: "50px", height: "50px", background: "#"+convert["lu'v'"].hex(backgroundColor) }}></div>
        </p> */}
        <div className="flex flex-wrap justify-center items-center icd space-x-5">
          <Image
            backgroundColor={backgroundColor}
            color={circleColor}
            direction={direction}
          />
          <div className="flex items-center justify-center flex-col space-y-2">
            <p className="text-xl">Select what part is missing </p>
            <div className="buttons">
              {Array.from({ length: 8 }, (_, i) => (
                <DirectionButton
                  key={i}
                  index={i}
                  direction={selectedDirection}
                  setDirection={setSelectedDirection}
                />
              ))}
            </div>
            <Button disabled={selectedDirection === undefined} onClick={answer}>
              Escolher
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  /**
   * This function is called when the user selects a direction.
   */
  function answer() {
    const correct = direction === selectedDirection;
    console.log(correct);
    console.log(circleColor);
    if (correct) {
      setMax(circleColor);
      setCircleColor(findMiddleColor(min, circleColor));
    } else {
      setMin(circleColor);
      setCircleColor(findMiddleColor(max, circleColor));
    }
    setCount(count + 1);
    setDirection(getRandomDirection());
  }

  /**
   * This function returns a random direction.
   */
  function getRandomDirection() {
    return Math.floor(Math.random() * 8);
  }
}

/**
 * @name DirectionButton
 *
 * @description
 * DirectionButton component is a reusable component that can be used to create direction buttons in the application.
 *
 * @param {Object} params - The parameters of the direction button component.
 * @param {number} params.index - The index.
 * @param {number} params.direction - The direction.
 * @param {Function} params.setDirection - Callback when the button is clicked.
 */
function DirectionButton({ index, direction, setDirection }) {
  const text = ["◠", "◝", ")", "◞", "◡", "◟", "(", "◜"];
  return (
    <button
      className={`border-2 
        ${index === direction ? "border-slate-400" : "border-slate-700"}  
        pos-${index + 1}
      hover:bg-slate-800  rounded-md direction-button`}
      onClick={() => {
        setDirection(index);
      }}
    >
      {text[index]}
    </button>
  );
}
