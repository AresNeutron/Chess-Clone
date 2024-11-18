import { useEffect, useState } from "react";
import { useChessContext } from "../context/ChessContext";
import { windowSize } from "../helpers/interfaces";
import calcPosition from "../functions/calcPosition";
import convertPosition from "../functions/convertPosition";
import { clearString, pieceImages } from "../helpers/dataReferences";

function Pieces() {
  const {
    whitesTurn,
    data,
    lastMove,
    selectedPiece,
    setSelectedPiece,
    lighted,
    handleLightState,
    handleAttackState,
  } = useChessContext();
  const imageWidth = 64; //width set to the images
  const infoHeight = 130; //height of the info
  const adjustment = 10; //to adjust the position of this component

  // Track window dimensions for dynamic resizing
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="pieceContainer"
      style={{ top: `${infoHeight}px`, left: `${-adjustment}px` }}
    >
      {/* Adding the pieces*/}
      {Object.values(data).map((piece) => {
        const isWhite = piece.name.includes("white");
        const coordinates = convertPosition(piece.position);

        const { x, y } = coordinates;
        const pos = calcPosition(
          x * imageWidth,
          y * (imageWidth - 1),
          windowSize
        );

        //Nothing to correct here, this is working fine
        const captureConditions = [
          lighted[y][x] == "red",
          selectedPiece,
          isWhite
            ? selectedPiece.includes("black")
            : selectedPiece.includes("white"),
        ];
        const captureAllowed = captureConditions.every((con) => con);

        const image = clearString(piece.name);
        return (
          <div
            onClick={() => {
              if (captureAllowed) {
                handleAttackState(selectedPiece, piece.name);
              } else {
                if ((whitesTurn && isWhite) || (!whitesTurn && !isWhite)) {
                  handleLightState(piece, lastMove);
                  setSelectedPiece(piece.name);
                } else {
                  // Optionally, provide feedback for invalid selection
                  alert("It's not your turn!");
                }
              }
            }}
            key={piece._id}
            className="piece"
            style={{
              top: `${pos.yPos}px`,
              left: `${pos.xPos}px`,
            }}
          >
            <img src={pieceImages[image]} alt={`${piece.name}`} />
          </div>
        );
      })}
    </div>
  );
}

export default Pieces;
