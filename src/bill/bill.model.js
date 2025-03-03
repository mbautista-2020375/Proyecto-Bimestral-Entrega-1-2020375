import { model, Schema } from "mongoose";

const billSchema = new Schema({
  cart: { 
      type: Schema.Types.ObjectId, 
      ref: "Cart", 
      required: true 
  },
  total: { 
      type: Number, 
      required: true 
  },
  date: { 
      type: Date, 
      default: Date.now 
  },
  status: { 
      type: String, 
      enum: ["completed", "pending", "canceled"], 
      default: "pending" 
  }
},
{
  timestamps: true
});


export default model("Bill", billSchema);
