import { useEffect, useState } from "react";
import convert from "color-convert";
import Image from "../../components/image/Image";
import Button from "../../components/button/Button";

import "./ColorFinder.css";

export default function ColorFinder({
  initMin,
  initMax,
  whenAdvance,
  findDistanceColors,
  findMiddleColor,
  storePoints,
}) {
  console.log(initMax);
  const [min, setMin] = useState(initMin);
  const [max, setMax] = useState(initMax);

  const maxCount = Math.ceil(Math.log2(findDistanceColors(initMin, initMax)));
  const [count, setCount] = useState(0);
  console.log(maxCount);
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
          {count} of {maxCount}
        </p>
        <div className="flex flex-wrap justify-center items-center icd space-x-5">
          <Image
            backgroundColor={"#" + convert.luv.hex(backgroundColor)}
            color={"#" + convert.luv.hex(circleColor)}
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
              Choose
            </Button>
          </div>
        </div>
      </div>
    </>
  );

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

  function getRandomDirection() {
    return Math.floor(Math.random() * 8);
  }
}

const text = ["◠", "◝", ")", "◞", "◡", "◟", "(", "◜"];
function DirectionButton({ index, direction, setDirection }) {
  return (
    <button
      className={`border-2 
        ${index === direction ? "border-slate-700" : "border-slate-400"}  
        pos-${index + 1}
      hover:bg-slate-100  rounded-md direction-button`}
      onClick={() => {
        setDirection(index);
      }}
    >
      {text[index]}
    </button>
  );
}
