import kingMovements from "../algorithms/king";
import knightMovements from "../algorithms/knight";
import getLinearMoves from "../algorithms/linearMoves";
import pawnMovements from "../algorithms/pawn";
import convertCoordinates from "./convertCoordinates";
import convertPosition, { Position } from "./convertPosition";
import filterMoves from "./filterMoves";

const getMoves=(name: string, position: string, board: string[][])=>{
    const coordinates = convertPosition(position)
    const {x, y} = coordinates
    const isWhite = name.includes('white')

    const type = name.split('-')[1]

    let rawMoves: Position[] = []

    //fill the array of position depending on the piece type
    switch(type){
        case 'knight':
            rawMoves = knightMovements(x,y);
            break;
        case 'rook':
        case 'bishop':
        case 'queen':
            rawMoves = getLinearMoves(type, x,y,board)
            break;
        case 'pawn':
            rawMoves = pawnMovements(x,y,isWhite,board)
            break;
        case 'king':
            rawMoves = kingMovements(x,y)
    }

    //filter the movements
  const filteredMoves = filterMoves(rawMoves, name, board)

  //convert to position strings
  const positionsArray = filteredMoves.map((move)=> convertCoordinates(move))

  return positionsArray;
}

export default getMoves