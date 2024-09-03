import { useRef, useEffect } from "react";
import circle from "../../images/circleImage";
import circleDiagonal from "../../images/circleDiagonalImage";
import { randomL } from "../../utils/lab";
import convert from "color-convert";

/**
 * @name Image
 *
 * @description
 * Image component is a reusable component that can be used to create images in the application.
 *
 * @param {Object} params - The parameters of the image component.
 * @param {string} params.backgroundColor - The background color.
 * @param {string} params.color - The of the circle.
 * @param {number} params.direction - The direction of the opening of the circle.
 */
export default function Image({ backgroundColor, color, direction }) {
  const canvasRef = useRef(null);
  const canvasSize = 350;

  function drawImage(img, colors, canvas, angle = null) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    const radius = 2;
    const diameter = radius * 2;
    const interval = 7;

    for (let i = 0; i < img.length; i++) {
      let row = img[i];
      for (let j = 0; j < row.length; j++) {
        if (img[j][i] !== 0) {
          let color = colors[img[j][i] - 1];
          color = randomL(color, interval);
          color = "#" + convert["lu'v'"].hex(color);

          let centerX = i * Math.floor(canvasSize / row.length) + diameter;
          let centerY = j * Math.floor(canvasSize / img.length) + diameter;

          if (angle) {
            centerX = centerX - canvasSize / 2;
            centerY = centerY - canvasSize / 2;
            let X = centerX * Math.cos(angle) - centerY * Math.sin(angle);
            let Y = centerX * Math.sin(angle) + centerY * Math.cos(angle);
            centerX = X + canvasSize / 2;
            centerY = Y + canvasSize / 2;
          }

          context.beginPath();
          context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          const fillColor = color;
          context.fillStyle = fillColor;
          context.fill();
        }
      }
    }
  }

  // useEffect(() => {
  //   drawImage(backgroundImage, [backgroundColor], canvasRef.current);
  // }, [backgroundColor])

  useEffect(() => {
    const img = direction % 2 === 0 ? circle : circleDiagonal;
    const angles = [0, 90, 180, 270].map((deg) => (deg * Math.PI) / 180);
    const angle = angles[Math.floor(direction / 2)];
    drawImage(img, [color, backgroundColor], canvasRef.current, angle);
  }, [color, backgroundColor, direction]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${canvasSize + 50}px`,
        height: `${canvasSize + 50}px`,
        backgroundColor: "black",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
      ></canvas>
    </div>
  );
}
