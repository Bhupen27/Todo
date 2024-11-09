import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, 
  },
});

export default mongoose.model("ToDo", toDoSchema);
