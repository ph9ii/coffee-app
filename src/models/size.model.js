import mongoose from "mongoose";

const sizeSchema = mongoose.Schema(
  {
    pack_size: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Size", sizeSchema);
