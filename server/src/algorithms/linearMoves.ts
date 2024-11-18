import { Position } from "../functions/convertPosition";

//For Rook, Bishop and Queen
const fillMoves = (
    ydirection: number,
    xdirection: number,
    xAxis: number,
    yAxis: number,
    board: string[][],
  ) => {
    const moves: Position[] = [];
    for (let i = 1; i < 8; i++) {
      const xSpeed = xdirection * i;
      const ySpeed = ydirection * i;
      const newX = xAxis + xSpeed;
      const newY = yAxis + ySpeed;
  
      // Check if the new position is within the board boundaries
      if (newY < 0 || newY >= 8 || newX < 0 || newX >= 8) break;
  
      if (!board[newY][newX]) {
        moves.push({ y: newY, x: newX });
      } else {
        // Stop adding moves if a piece blocks further movement
        moves.push({ y: newY, x: newX });
        break;
      }
    }
    return moves;
  };
  
  const linearMoves = (
    xAxis: number,
    yAxis: number,
    board: string[][]
  ): Position[] => {
    let moves: Position[] = [];
    moves = [...fillMoves(1, 0, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(0, 1, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(-1, 0, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(0, -1, xAxis, yAxis, board)];
    return moves;
  };
  
  const diagonalMoves = (
    xAxis: number,
    yAxis: number,
    board: string[][]
  ): Position[] => {
    let moves: Position[] = [];
    moves = [...fillMoves(1, 1, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(-1, 1, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(-1, -1, xAxis, yAxis, board)];
    moves = [...moves, ...fillMoves(1, -1, xAxis, yAxis, board)];
    return moves;
  };
  
  // Helper functions for board-dependent moves
  const boardDependentMoves: Record<
    string,
    (xAxis: number, yAxis: number, board: string[][]) => Position[]
  > = {
    rook: (xAxis, yAxis, board) => linearMoves(xAxis, yAxis, board),
    bishop: (xAxis, yAxis, board) => diagonalMoves(xAxis, yAxis, board),
    queen: (xAxis, yAxis, board) => [
      ...linearMoves(xAxis, yAxis, board),
      ...diagonalMoves(xAxis, yAxis, board),
    ],
  };

  // General function to get moves based on piece type
const getLinearMoves = (
    piece: string,
    xAxis: number,
    yAxis: number,
    board: string[][],
  ): Position[] => {
    if (boardDependentMoves[piece])
      return boardDependentMoves[piece](xAxis, yAxis, board);
    return [];
  };
  
export default getLinearMoves