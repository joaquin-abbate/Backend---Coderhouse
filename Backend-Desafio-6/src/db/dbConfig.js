import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://admin_joa:joadmin1@abbate.llw9bfj.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log(error);
}
