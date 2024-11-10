import { Button } from "./ui/button";
import axios from "axios";
import React, { useState } from "react";

const TodoItems = ({text, id, completed, setUpdateUI,onToggleComplete}) => {

  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoText, setTodoText] = useState(text)

  const toggleComplete = () => {
    axios
      .put(`http://localhost:5000/api/toggleComplete/${id}`, {
        completed: !completed,
      })
      .then((res) => {
        onToggleComplete(id, !completed);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = () => {
    axios.delete(`http://localhost:5000/api/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    axios
      .put(`http://localhost:5000/api/update/${id}`, { toDo: todoText })
      .then((res) => {
        setIsTodoEditable(false)
        setUpdateUI((prevState) => !prevState);
      });
  };

  const toggleCompleted = () => {
    toggleComplete(id)
}

  return (
    <div
      className={`flex justify-between border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 mb-2 shadow-sm shadow-white/50 duration-300  text-black ${
        completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={completed}
        onChange={toggleCompleted}
      />
      <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${completed ? "line-through" : ""}`}
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (completed) return;

                    if (isTodoEditable) {
                        updateToDo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>

        <Button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={deleteTodo}
        >
          ❌
        </Button>
     
    </div>
  );
};

export default TodoItems;
