import { Position } from "../functions/convertPosition";

//To manage the pawn attacks
const pawnAttacks = (
    xAxis: number,
    yAxis: number,
    isWhite: boolean,
    board: string[][]
  ): Position[] => {
    const direction = isWhite ? -1 : 1;
    const moves: Position[] = [];
    
    // Calculate the left and right attack positions
    const leftAttack = board[yAxis + direction]?.[xAxis - 1];
    const rightAttack = board[yAxis + direction]?.[xAxis + 1];
    
    // Check if there’s an opponent piece on the left
    if (leftAttack && !leftAttack.includes(isWhite ? 'white' : 'black')) {
      moves.push({ y: yAxis + direction, x: xAxis - 1 });
    }
    
    // Check if there’s an opponent piece on the right
    if (rightAttack && !rightAttack.includes(isWhite ? 'white' : 'black')) {
      moves.push({ y: yAxis + direction, x: xAxis + 1 });
    }
    
    return moves; // Return all valid attack moves
  };

const pawnMovements = (
    xAxis: number,
    yAxis: number,
    isWhite: boolean,
    board: string[][]
  ): Position[] => {
    const direction = isWhite ? -1 : 1;
    const moves: Position[] = [];
    
    // Standard one-step forward move
    if (board[yAxis + direction]?.[xAxis] === "") {
      moves.push({ y: yAxis + direction, x: xAxis });
    }
  
    // Two-step move if the pawn is in its starting position
    if ((isWhite && yAxis === 6) || (!isWhite && yAxis === 1)) {
      if (board[yAxis + 2 * direction]?.[xAxis] === "") {
        moves.push({ y: yAxis + 2 * direction, x: xAxis });
      }
    }

    const attacks = pawnAttacks(xAxis,yAxis,isWhite,board)
    const allMoves = [...moves, ...attacks]

    return allMoves;
  };

export default pawnMovements