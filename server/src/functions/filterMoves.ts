import findPosition from "../data/findPosition";
import { Position } from "./convertPosition";
import isProtector from "./isProtector";

const filterMoves = (
  rawMoves: Position[],
  pieceName: string,
  board: string[][]
) => {
  const filteredMoves = rawMoves.filter(
    (move) =>
      //if is inside the limits of the board
      move.x >= 0 && move.x <= 7 && move.y >= 0 && move.y <= 7
  );

  //if is not king
  if (!pieceName.includes("king")) {
    const protector = isProtector(pieceName, board);

    if (protector.isProtector) {
      const { y: yVel, x: xVel } = protector.direction;
      const { y, x } = findPosition(pieceName, board);

      //if y + yVel * i = move.y
      // Further filter moves to only include those in the direction of the threat
      const safeMoves = filteredMoves.filter((move) => {
        // Calculate relative position of the move
        const deltaY = move.y - y;
        const deltaX = move.x - x;

        // Check if move aligns with the direction of the threat
        const alignsWithThreat =
          ((yVel === 0 && deltaY === 0) || // Horizontal alignment
            (xVel === 0 && deltaX === 0) || // Vertical alignment
            deltaY / yVel === deltaX / xVel) && // Diagonal alignment
          Math.sign(deltaY) === Math.sign(yVel) && // Same vertical direction
          Math.sign(deltaX) === Math.sign(xVel); // Same horizontal direction

        return alignsWithThreat;
      });

      return safeMoves;
    }
  }

  return filteredMoves;
};

export default filterMoves;
