import { useRef, useEffect } from "react";
import backgroundImage from "../../images/backgroundImage";
import circle from "../../images/circleImage";
import circleDiagonal from "../../images/circleDiagonalImage";
import { addAlpha } from "../../utils/hex";

export default function Image({ backgroundColor, color, direction }) {
  const canvasRef = useRef(null);
  const canvasSize = 400;

  function drawImage(img, colors, canvas, angle = null) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    const radius = 2;
    const diameter = radius * 2;
    const minOpacity = 0.7;

    for (let i = 0; i < img.length; i++) {
      let row = img[i];
      for (let j = 0; j < row.length; j++) {
        if (img[j][i] !== 0) {
          const color = colors[img[j][i] - 1];
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
          const fillColor = addAlpha(
            color,
            (1 - minOpacity) * Math.random() + minOpacity
          );
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
