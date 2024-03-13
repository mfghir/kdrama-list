import mongoose from "mongoose";

const kdramaSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const KDramaModel =
  mongoose.models.KDramaModel || mongoose.model("Kdrama", kdramaSchema);

export default KDramaModel;
