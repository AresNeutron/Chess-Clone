import findPosition from "../data/findPosition";
import { directions } from "../data/forThreatFunction";
import { Position } from "./convertPosition";

const isProtector = (pieceName: string, board: string[][]) => {
  const piecePosition = findPosition(pieceName, board);
  const isWhite = pieceName.includes("white");
  const kingPosition = findPosition(
    `${isWhite ? "white" : "black"}-king-1`,
    board
  );

  const { direction, diagonal } = getDirection(pieceName, kingPosition, board);
  const { y: yVel, x: xVel } = direction;
  const { y: yPos, x: xPos } = piecePosition;

  for (let i = 1; i < 8; i++) {
    const newY = yPos + yVel * i;
    const newX = xPos + xVel * i;

    // Boundary check
    if (newY < 0 || newY >= 8 || newX < 0 || newX >= 8) break;

    const currentCell = board[newY][newX];

    const conditionsForProtection: boolean[] = [
      currentCell.includes(`${isWhite ? "black" : "white"}-queen`),
      currentCell.includes(`${isWhite ? "black" : "white"}-bishop`),
      currentCell.includes(`${isWhite ? "black" : "white"}-rook`),
    ];

    if (diagonal) {
      if (conditionsForProtection[0] || conditionsForProtection[1])
        return { isProtector: true, direction };
    } else {
      if (conditionsForProtection[0] || conditionsForProtection[2])
        return { isProtector: true, direction };
    }

    // Stop if any blocking piece is found
    if (currentCell) break;
  }

  return { isProtector: false, direction };
};

export default isProtector;

const getDirection = (
  pieceName: string,
  kingPosition: Position,
  board: string[][]
) => {
  const { x: xKing, y: yKing } = kingPosition;

  for (const dir of directions) {
    for (let i = 1; i < 8; i++) {
      // Start at 1 to avoid checking the king's position
      const newY = yKing + dir.y * i;
      const newX = xKing + dir.x * i;

      // Boundary check
      if (newY < 0 || newY >= 8 || newX < 0 || newX >= 8) break;

      if (board[newY][newX] === pieceName) {
        return {
          direction: dir,
          diagonal: Math.abs(dir.x) === Math.abs(dir.y),
        };
      }

      // Stop if any piece blocks the path
      if (board[newY][newX]) break;
    }
  }

  // Default return if no direction is found
  return { direction: { y: 0, x: 0 }, diagonal: false };
};
