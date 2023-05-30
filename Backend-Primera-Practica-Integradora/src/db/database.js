import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://admin_joa:joadmin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongodb: try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(error);
}
