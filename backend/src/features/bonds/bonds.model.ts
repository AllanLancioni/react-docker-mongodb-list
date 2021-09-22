import { model, Schema } from "mongoose";

export const bondsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export const Bond = model<any>("Bond", bondsSchema);
