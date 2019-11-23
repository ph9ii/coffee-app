import mongoose from "mongoose";

const typeSchema = mongoose.Schema(
  {
    product_type: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Type", typeSchema);
