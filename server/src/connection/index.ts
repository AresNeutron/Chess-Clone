import mongoose from "mongoose";

const connectToDB = async () => {
  // Create a connection to MySQL
  const connectionString =
    process.env.MONGO_URI ||
    "mongodb+srv://arexneutron:5k4yzsy66kepyvx@personal-finances.spulb.mongodb.net/ChessBoard";
    // 'mongodb://localhost:27017'
  mongoose.connect(connectionString)
  .then(()=>{
    console.log("CONNECTED TO MONGODB")
  }).catch((err)=>{
    console.error(err)
  })
};

export default connectToDB;
