import mongoose, { model, Schema } from "mongoose";

export interface PieceInterface {
  _id?: string;
  name: string;
  position: string;
  hasMoved: boolean;
  moves: string[];
}

export type DataObject = {
  [key in string]: PieceInterface;
};

const pieceSchema = new Schema<PieceInterface>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  hasMoved: { type: Boolean, required: true },
  moves: { type: [String], required: true }, // Use `[String]` instead of `String[]`
});

export const PieceModel =
  (mongoose.models.Piece as mongoose.Model<PieceInterface>) ||
  model<PieceInterface>("Piece", pieceSchema);
