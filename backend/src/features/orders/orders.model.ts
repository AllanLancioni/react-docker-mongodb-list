import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const ordersSchema = new Schema({
  customer: {
    type: ObjectId,
    required: true,
    ref: 'Customer'
  },
  bond: {
    type: ObjectId,
    required: true,
    ref: 'Bond'
  },
  boughtAt: {
    type: Date,
    required: true
  },
  paidAt: {
    type: Date,
    default: null
  }
});

export const Order = model<any>("Order", ordersSchema);
