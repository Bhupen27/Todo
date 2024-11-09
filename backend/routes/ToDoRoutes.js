import { Router } from "express";
import { getToDos, saveToDo, updateToDo, deleteToDo, toggleComplete } from "../controller/ToDoController.js";

const router = Router();

router.get("/get", getToDos);
router.post("/save", saveToDo);
router.put("/update/:id", updateToDo);
router.delete("/delete/:id", deleteToDo);
router.put("/toggleComplete/:id", toggleComplete)

export default router;
