import "./ICD.css";
import { useState } from "react";
import Image from "../../components/image/Image";
import Button from "../../components/button/Button";

const text = ["◠", "◝", ")", "◞", "◡", "◟", "(", "◜"];

function DirectionButton({ direction, setAnswer }) {
  return (
    <button
      className={`border-2 border-black hover:bg-slate-100 focus:bg-slate-200 rounded-md direction-button pos-${
        direction + 1
      }`}
      onClick={setAnswer(direction)}
    >
      {text[direction]}
    </button>
  );
}

function ICD() {
  const [direction, setDirection] = useState(0);
  const [answer, setAnswer] = useState(0);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center icd min-h-screen h-64 space-x-5">
        <Image
          backgroundColor="#008000"
          color="#ffff00"
          direction={Math.floor(Math.random() * 8)}
        />
        <div
          className="flex items-center justify-center flex-col space-y-2"
        >
          <p className="text-xl">Select what part is missing </p>
          <div className="buttons">
            {Array.from({ length: 8 }, (_, i) => (
              <DirectionButton key={i} direction={i} setAnswer={setAnswer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ICD;
