import { Schema, model } from "mongoose";

const documentSchema = new Schema(
  {
    docsOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Document = model("document", documentSchema);

export default Document;
