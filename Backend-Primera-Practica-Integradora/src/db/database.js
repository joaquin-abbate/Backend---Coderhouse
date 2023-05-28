import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://admin_joa:joadmin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority";
// "mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority";

try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(error);
}
