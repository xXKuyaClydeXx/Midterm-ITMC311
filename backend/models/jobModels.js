import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

jobSchema.set("toJSON", {
  virtuals: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
