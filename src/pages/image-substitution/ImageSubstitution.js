import { useEffect, useState } from "react";
import { fetchUrl } from "../../fetch";
import convert from "color-convert";
import Button from "../../components/button/Button";

export default function ImageSubstitution({ points, luminances, circle }) {
  const [diffDegree, setDiffDegree] = useState(undefined);
  const [userEllipse, setUserEllipse] = useState(undefined);
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");

  useEffect(async () => {
    const res = await fetchUrl("/ellipse", {
      method: "POST",
      data: {
        x: points.slice(0, 6).map((point) => point[0]),
        y: points.slice(0, 6).map((point) => point[1]),
      },
    });
    const ellipse = await res.json();
    setUserEllipse(ellipse);
  }, []);

  async function testColors() {
    try {
      let userConfusionPoint = getConfusionUserPoint(
        userEllipse.parameters,
        circle
      );
      const res = await fetchUrl(
        "/differentiation",
        {
          method: "POST",
          data: {
            ellipse: { ...userEllipse.parameters },
            luminances: {
              top: luminances[0],
              bottom: luminances[1]
            },
            confusionPoint: userConfusionPoint[0],
            colors: {
              1: convert.hex.luv(color1),
              2: convert.hex.luv(color2),
            },
            x: points.slice(0, 6).map((point) => point[0]),
            y: points.slice(0, 6).map((point) => point[1]),
          },
        }
      );
      const diffDegreeLocal = (await res.json()).diff;
      console.log(diffDegreeLocal);
      setDiffDegree(diffDegreeLocal);
    } catch (err) { }
  }

  return (
    <div
      className="w-screen flex justify-center items-center flex-col space-y-5"
      style={{ height: "max(100vh, 700px)" }}
    >
      <p>
        Color 1:{" "}
        <input
          type="color"
          value={color1}
          onChange={(e) => {
            setColor1(e.target.value);
          }}
        ></input>
      </p>
      <p>
        Color 2:{" "}
        <input
          type="color"
          value={color2}
          onChange={(e) => {
            setColor2(e.target.value);
          }}
        ></input>
      </p>
      <Button
        onClick={async () => {
          await testColors();
        }}
      >
        Test
      </Button>
      <p>
        {diffDegree !== undefined &&
          `Differentiation degree: ${diffDegree}`}
      </p>
    </div>
  );
}

function getConfusionUserPoint(ellipse, circle) {
  // y = m(x - x0) + y0
  // y = mx - mx0 + y0
  const angularLineCoef = ellipse.phi;
  const linearLineCoef = -(ellipse.phi * ellipse.center[0]) + ellipse.center[1];

  // (x - t1)^2 + (y - t2)^2 = r^2
  // (x - t1)^2 + (mx - mx0 + y0 - t2)^2 = r^2
  // (x - t1)^2 + (mx - t2')^2 = r^2
  // (x^2 - 2xt1 + t1^2) + (m^2x^2 - 2mxt2' + t2'^2) = r^2
  // (1 + m^2)x^2 -(t1 + mt2')2x + t1^2 + t2'^2 - r^2 = 0
  const new_t2 = -(linearLineCoef - circle.t2);
  const a = 1 + Math.pow(angularLineCoef, 2);
  const b = -(2 * circle.t1) - 2 * (angularLineCoef * new_t2);
  const c =
    Math.pow(circle.t1, 2) + Math.pow(new_t2, 2) - Math.pow(circle.radius, 2);

  const [x1, x2] = baskhara(a, b, c);
  return [
    [x1, x1 * angularLineCoef + linearLineCoef],
    [x2, x2 * angularLineCoef + linearLineCoef],
  ];
}

function baskhara(a, b, c) {
  const delta = Math.pow(b, 2) - 4 * a * c;
  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);
  return [x1, x2];
}
