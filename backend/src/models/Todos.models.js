// mongoose js ki library hai jo huma validation deti hai taka hamara kam asan ho saka or  hamara data base ma locha na 
// models jo hai usma hum schema bnata hai ka kis tarah data save karayan data base ma 
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todos", todoSchema);