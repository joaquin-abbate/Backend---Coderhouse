import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MongoAtlasUrl;

try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log(error);
}
