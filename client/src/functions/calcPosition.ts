import { windowSize } from "../helpers/interfaces";

const calcPosition = (xAxis: number, yAxis: number, windowSize: windowSize) => {
  const imageWidth = 64;
  const boardWidth = 8 * imageWidth;

  const xPos = Math.round(
    (windowSize.width - boardWidth) / 2 + xAxis
  );
  const yPos = Math.round(
    (windowSize.height - boardWidth) / 2 + yAxis
  );
  return { xPos, yPos };
};

export default calcPosition;
