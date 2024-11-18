import express, { Request, Response } from "express";
import { DataObject, PieceModel } from "../models/pieceModel";
import getMoves from "../functions/getMoves";
import { clearDatabase, fillDataBase } from "../script";

const router = express.Router();

//always put two parameters, req and res, wether you use them or not
router.get("/get", async (req: Request, res: Response) => {
  try {
    const pieces = await PieceModel.find({});

    console.log("Data Fetched Successfully");
    res.status(200).json({ data: pieces });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "something went wrong", err });
    return;
  }
});

router.post("/create-piece", async (req: Request, res: Response) => {
  try {
    const { name, position, hasMoved, moves } = req.body; //Pick up the body and destructure

    await PieceModel.create({ name, position, hasMoved, moves });
    console.log("Piece Created", name);
    res.status(201).send("Piece created");
    return;
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
});

router.post("/reset", async (req: Request, res: Response) => {
  try {
    await clearDatabase(); // Clear all data
    await fillDataBase(); // Refill with initial data
    res.status(200).send("Game reset successfully");
  } catch (error) {
    console.error("Error resetting the game:", error);
    res.status(500).send("Failed to reset the game");
  }
});

router.put("/move/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { position } = req.body;

    const updated = await PieceModel.findByIdAndUpdate(
      id,
      { position: position },
      { new: true } // Returns the updated document
    );

    if (!updated) {
      res.status(404).send({ message: "Piece not found" });
      return;
    }
    res.status(200).send({ message: "Position Updated", piece: updated });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error Updating Position", error: err });
    return;
  }
});

router.put("/promote/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name: newPiece } = req.body;

    const updated = await PieceModel.findByIdAndUpdate(
      id,
      { name: newPiece },
      { new: true } // Returns the updated document
    );

    if (!updated) {
      res.status(404).send({ message: "Piece not found" });
      return;
    }
    res.status(200).send({ message: "Promotion Updated", piece: updated });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error Updating Promotion", error: err });
    return;
  }
});

router.put("/update-moves", async (req: Request, res: Response) => {
  try {
    const { board, data } = req.body;
    const oldData: DataObject = data;
    const dataArray = Object.values(oldData);

    const promisesArray = dataArray.map(async (piece) => {
      const { _id, name, position } = piece;
      if (!_id) throw new Error(`Piece with name ${name} has an invalid ID`);

      const newMoves = getMoves(name, position, board);
      return PieceModel.findByIdAndUpdate(
        _id,
        { moves: newMoves },
        { new: true }
      ).then((updated) => {
        if (!updated) throw new Error(`Piece with id ${_id} not found`);
      });
    });

    await Promise.all(promisesArray);
    res.status(200).send({ message: "All Moves Updated" });
  } catch (err) {
    console.error("Error in /update-moves endpoint:", err);
    res
      .status(500)
      .json({ message: "Error Updating Moves" });
    return;
  }
});

router.put("/clear", async (req: Request, res: Response) => {
  try {
    // Assuming you have already connected to your MongoDB instance
    await PieceModel.deleteMany({});
    console.log("All Pieces Deleted");
    res.status(200).send("All Pieces Deleted");
    return;
  } catch (err) {
    console.log("Could not delete pieces", err);
    res.status(500).send({ message: "Error Deleting all pieces", error: err });
    return;
  }
});

//Fix the issue with the parameter
router.delete("/capture/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await PieceModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).send({ message: "Piece not found" });
      return;
    }
    res.status(200).send({ message: "Piece Deleted", piece: deleted });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error Deleting Piece", error: err });
    return;
  }
});

export default router;
