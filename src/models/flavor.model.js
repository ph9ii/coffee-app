import mongoose from "mongoose";

const flavorSchema = mongoose.Schema(
  {
    flavor: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 255
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Flavor", flavorSchema);
