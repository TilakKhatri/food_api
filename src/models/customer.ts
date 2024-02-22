import mongoose, { Schema, Document } from "mongoose";

export interface CustomerDoc extends Document {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  verified: boolean;
  password: string;
  salt: string;
  otp: number;
  otp_expiry: Date;
  cart: [any];
  lat: number;
  lng: number;
  orders: [any];
}

const CustomerSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    verified: { type: Boolean },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: false },
    otp: { type: Number },
    otp_expiry: { type: Date },
    lat: { type: Number },
    lng: { type: Number },
    cart: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food", require: true },
        unit: { type: Number, require: true },
      },
    ],
    // orders:[
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'order'
    //     }
    // ]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Customer = mongoose.model<CustomerDoc>("customer", CustomerSchema);

export { Customer };
