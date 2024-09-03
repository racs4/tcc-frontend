import { useState } from "react";
import { fetchUrl } from "../../fetch";
import Button from "../../components/button/Button";

export default function ImageSubstitution({ points, luminances, circle }) {
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [selectedMethod, setSelectedMethod] = useState(undefined);

  const image_names = ["flor", "cidade", "floresta", "ishihara", "maca"];
  const methods = ["tcc", "original"];

  async function testColors() {
    try {
      setLoading(true);
      setResult(undefined);
      const resEllipse = await fetchUrl("/ellipse", {
        method: "POST",
        data: {
          x: points.slice(0, 6).map((point) => point[0]),
          y: points.slice(0, 6).map((point) => point[1]),
        },
      });
      const ellipse = await resEllipse.json();
      const resConfusion = await fetchUrl("/confusion-point", {
        method: "POST",
        data: {
          ellipse: { ...ellipse.parameters },
        },
      });
      const userConfusionPoint = (await resConfusion.json()).confusionPoint;
      const res = await fetchUrl(`/image`, {
        method: "POST",
        data: {
          ellipse: { ...ellipse.parameters },
          image: selectedImage,
          method: selectedMethod,
          luminances: {
            top: luminances[0],
            bottom: luminances[1],
          },
          confusionPoint: userConfusionPoint[0],
        },
      });
      setLoading(false);
      setError(false);
      const image = await res.text();
      setResult(image);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  async function withDisabledCheck(condition, fn) {
    if (condition) {
      await fn();
    }
  }

  return (
    <div
      className="flex justify-center items-center flex-col space-y-5 my-20"
      style={{ minHeight: "min(100vh, 700px)" }}
    >
      <h1>Selecione uma imagem e um método</h1>
      <div className="space-x-2">
        {image_names.map((image_name) => (
          <button
            key={image_name}
            onClick={() => {
              setSelectedImage(image_name);
            }}
            className={`border-2  px-5 py-1 hover:bg-slate-900 rounded-md   ${
              selectedImage === image_name
                ? "border-green-500"
                : "border-slate-100"
            } ${
              loading
                ? "border-slate-800 text-slate-500 cursor-default"
                : "border-white cursor-pointer"
            }`}
          >
            {image_name}
          </button>
        ))}
      </div>
      <div className="space-x-2">
        {methods.map((method) => (
          <button
            key={method}
            onClick={() => {
              setSelectedMethod(method);
            }}
            className={`border-2  px-5 py-1 hover:bg-slate-900 rounded-md   ${
              selectedMethod === method
                ? "border-green-500"
                : "border-slate-100"
            } ${
              loading
                ? "border-slate-800 text-slate-500 cursor-default"
                : "border-white cursor-pointer"
            }`}
          >
            {method}
          </button>
        ))}
      </div>
      <div>
        <Button
          disabled={loading}
          onClick={() => {
            withDisabledCheck(!loading, testColors);
          }}
        >
          Ver resultado
        </Button>
      </div>
      <div>
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>An error occurred, try again</span>
        ) : result ? (
          <img src={"data:image/png;base64," + result} alt="Result"></img>
        ) : null}
      </div>
    </div>
  );
}

// function getConfusionUserPoint(ellipse, circle) {
//   // y = m(x - x0) + y0
//   // y = mx - mx0 + y0
//   const angularLineCoef = ellipse.phi;
//   const linearLineCoef = -(ellipse.phi * ellipse.center[0]) + ellipse.center[1];

//   // (x - t1)^2 + (y - t2)^2 = r^2
//   // (x - t1)^2 + (mx - mx0 + y0 - t2)^2 = r^2
//   // (x - t1)^2 + (mx - t2')^2 = r^2
//   // (x^2 - 2xt1 + t1^2) + (m^2x^2 - 2mxt2' + t2'^2) = r^2
//   // (1 + m^2)x^2 -(t1 + mt2')2x + t1^2 + t2'^2 - r^2 = 0
//   const new_t2 = -(linearLineCoef - circle.t2);
//   const a = 1 + Math.pow(angularLineCoef, 2);
//   const b = -(2 * circle.t1) - 2 * (angularLineCoef * new_t2);
//   const c =
//     Math.pow(circle.t1, 2) + Math.pow(new_t2, 2) - Math.pow(circle.radius, 2);

//   const [x1, x2] = baskhara(a, b, c);
//   return [
//     [x1, x1 * angularLineCoef + linearLineCoef],
//     [x2, x2 * angularLineCoef + linearLineCoef],
//   ];
// }

// function baskhara(a, b, c) {
//   const delta = Math.pow(b, 2) - 4 * a * c;
//   const x1 = (-b + Math.sqrt(delta)) / (2 * a);
//   const x2 = (-b - Math.sqrt(delta)) / (2 * a);
//   return [x1, x2];
// }
