import mongoose from "mongoose";

const podSchema = mongoose.Schema(
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
    coffee_flavor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flavor",
      required: true
    },
    coffee_flavor: { type: String, required: true },
    product_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true
    },
    product_type: { type: String, required: true },
    pack_size_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
      required: true
    },
    pack_size: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Pod", podSchema);
