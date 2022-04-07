import { useState } from "react";
import convert from "color-convert";

export default function ColorConverter({}) {
  const [luvColor, setLuvColor] = useState([0, 0, 0]);
  const [rgbColor, setRgbColor] = useState([119, 119, 119]);
  const [xyYColor, setXyYColor] = useState([0, 0, 0]);
  const [XYZColor, setXYZColor] = useState([0, 0, 0]);
  const [keywordColor, setKeywordColor] = useState("blue");

  function setColor(oldValue, prop, newPropValue, setFunction) {
    const newValue = [...oldValue];
    newValue[prop] = Number(newPropValue);
    setFunction(newValue);
  }

  function getColorFromKeyword(keywordColor, color) {
    try {
      return (convert.keyword[color].raw(keywordColor) || []).join();
    } catch {
      return "";
    }
  }

  return (
    <main className="font-mono flex flex-col justify-center w-screen">
      <div className="w-full flex items-center flex-col mx-5 my-10 space-y-5">
        <p>LUV</p>
        <div className="flex justify-center w-full space-x-5">
          {[0, 1, 2].map((prop) => (
            <input
              key={prop}
              value={luvColor[prop]}
              className="border border-black rounded-lg text-center"
              type="number"
              onChange={(e) => {
                setColor(luvColor, prop, e.target.value, setLuvColor);
              }}
            ></input>
          ))}
        </div>

        <div className="space-x-5">
          <span>Rgb: {convert.luv.rgb(luvColor).join()}</span>
          <span>xyY: {convert.luv.xyY.raw(luvColor).join()}</span>
          <span>Lu'v': {convert.luv["lu'v'"].raw(luvColor).join()}</span>
        </div>
      </div>

      <div className="w-full flex items-center flex-col mx-5 my-10 space-y-5">
        <p>Keyword</p>
        <div className="flex justify-center w-full space-x-5">
          <input
            value={keywordColor}
            className="border border-black rounded-lg text-center"
            onChange={(e) => {
              setKeywordColor(e.target.value);
            }}
          ></input>
        </div>

        <div className="space-y-2">
          <p>Luv: {getColorFromKeyword(keywordColor, "luv")}</p>
          <p>xyY: {getColorFromKeyword(keywordColor, "xyY")}</p>
          <p>Rgb: {(convert.keyword.rgb(keywordColor) || []).join()}</p>
        </div>
      </div>

      <div className="w-full flex items-center flex-col mx-5 my-10 space-y-5">
        <p>RGB</p>
        <div className="flex justify-center w-full space-x-5">
          {[0, 1, 2].map((prop) => (
            <input
              key={prop}
              value={rgbColor[prop]}
              className="border border-black rounded-lg text-center"
              type="number"
              onChange={(e) => {
                setColor(rgbColor, prop, e.target.value, setRgbColor);
              }}
            ></input>
          ))}
        </div>

        <div className="space-x-5">
          <span>Luv: {convert.rgb.luv(rgbColor).join()}</span>
          <span>xyY: {convert.rgb.xyY(rgbColor).join()}</span>
        </div>
      </div>

      <div className="w-full flex items-center flex-col mx-5 my-10 space-y-5">
        <p>XYZ</p>
        <div className="flex justify-center w-full space-x-5">
          {[0, 1, 2].map((prop) => (
            <input
              key={prop}
              value={XYZColor[prop]}
              className="border border-black rounded-lg text-center"
              type="number"
              onChange={(e) => {
                setColor(XYZColor, prop, e.target.value, setXYZColor);
              }}
            ></input>
          ))}
        </div>

        <div className="space-x-5">
          <p>RGB: {convert.xyz.rgb(XYZColor).join()}</p>
          <p>Luv: {convert.xyz.luv.raw(XYZColor).join()}</p>
          <p>xyY: {convert.xyz.xyY.raw(XYZColor).join()}</p>
        </div>
      </div>
    </main>
  );
}
