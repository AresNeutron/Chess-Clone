import { blackPieces, whitePieces } from "./data/names";
import { blackStartingPos, whiteStartingPos } from "./data/startingPos";
import { PieceInterface } from "./models/pieceModel";
import startingBoard from "./data/startingBoard";
import getMoves from "./functions/getMoves";

export const clearDatabase = async () => {
  try {
    await fetch("http://localhost:3003/api/clear", {
      method:"PUT",
      headers:{
        'content-type':'application/json'
      }
    })

    console.log("Database cleared successfully");
  } catch (err) {
    console.log("Error calling the clear function", err);
  }
};

const addPieceToDatabase = async (pieceData: PieceInterface) => {
  try {
    const response = await fetch("http://localhost:3003/api/create-piece", {
      method: "POST",
      body: JSON.stringify(pieceData),
      headers:{
        'content-type':'application/json'
      }
    })
    console.log("Piece added");
  } catch (error) {
    console.error("Error adding piece:", error);
  }
};

export const fillDataBase = async () => {
  try {
    const whitePromises = whitePieces.map((piece, index) =>
        addPieceToDatabase({
          name: piece,
          position: whiteStartingPos[index],
          hasMoved: false,
          moves: getMoves(piece, whiteStartingPos[index],startingBoard)
        })
    );

    const blackPromises = blackPieces.map((piece, index) =>
      addPieceToDatabase({
        name: piece,
        position: blackStartingPos[index],
        hasMoved: false,
        moves:  getMoves(piece, blackStartingPos[index],startingBoard)
      })
    ); // Wait for all promises to complete
    await Promise.all([...whitePromises, ...blackPromises]);

    console.log("All pieces added successfully!");
  } catch (error) {
    console.error("Error filling database:", error);
  }
};
