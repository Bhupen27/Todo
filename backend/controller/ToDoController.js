import ToDoModel from "../models/ToDoModel.js";

export const getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find();
    res.status(200).send(toDos);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

export const saveToDo = async (req, res) => {
  const { toDo } = req.body;

  try {
    const data = await ToDoModel.create({ toDo });
    console.log("Saved Successfully...");
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


export const updateToDo = async (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  try {
    await ToDoModel.findByIdAndUpdate(id, { toDo });
    res.send("Updated Successfully...");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


export const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    await ToDoModel.findByIdAndDelete(id);
    res.send("Deleted Successfully...");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

export const toggleComplete = async (req, res) => {
  const { id } = req.params;
  
  try {
    const todo = await ToDoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the 'completed' status
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      id,
      { completed: !todo.completed },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error toggling todo completion status" });
  }
};

