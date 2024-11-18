import express from "express";
import cors from "cors";
import connectToDB from "./connection";
import router from "./router/route";
import { clearDatabase, fillDataBase } from "./script";

const main = async () => {
  const app = express();

  app.use(cors()); // Enable CORS
  app.use(express.json()); // Parse JSON requests

  const PORT = 3003;

  await connectToDB();

  app.use("/api", router);

  //Solved, for now
  clearDatabase();
  setTimeout(() => {
    fillDataBase();
  }, 2000);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

main();
