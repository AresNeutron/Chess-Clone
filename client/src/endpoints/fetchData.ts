import { DataObject, PieceInterface } from "../helpers/interfaces";

const fetchPieces = async () => {
    try {
      const res = await fetch("http://localhost:3003/api/get");
      if (!res.ok) {
        console.error("Fetch Function failed");
        return {};
      }

      const response = await res.json();
      const data: PieceInterface[] = response.data;
      const newData: DataObject = {};

      if (!Array.isArray(data)) {
        console.error("Unexpected data format");
        return {};
      }

      //this can throw an error
      for (let i = 0; i < 32; i++) {
        const piece = data[i];
        if (piece) {
          newData[piece?.name] = {
            _id: piece._id,
            name: piece.name,
            position: piece.position,
            hasMoved: piece.hasMoved,
            moves: piece.moves,
          };
        }
      }

      return newData;
    } catch (err) {
      console.error(err);
      return {};
    }
  };

export default fetchPieces