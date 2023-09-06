import mongoose from "mongoose";

export const productsCollection = "products";

export const productsSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_stock: { type: Number, required: true },
  product_owner: { type: Boolean, default: false, require: true },
});

export const ProductModel = mongoose.model(productsCollection, productsSchema);
