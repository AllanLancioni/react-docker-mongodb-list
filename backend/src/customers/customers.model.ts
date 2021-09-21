import { model, Schema } from "mongoose";

export const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  document: {
    type: Number,
    required: true
  }
});

export const Customer = model<any>("Customer", customerSchema);
