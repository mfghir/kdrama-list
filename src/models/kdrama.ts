import mongoose from "mongoose";

const KDramaSchema = new mongoose.Schema(
  {
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
    author: {
      type: mongoose.Schema.Types.ObjectId, // reference to the user who created this
      ref: "User", // it will look for a model with that name in lowercase
    },
  },
  { timestamps: true }
);

const KDramaModel =
  mongoose.models.KDramaModel || mongoose.model("KDramaModel", KDramaSchema);

export default KDramaModel;
