import mongoose from "mongoose";

const machineSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    water_line_compatible: { type: Boolean, default: false },
    product_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true
    },
    product_type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Machine", machineSchema);
