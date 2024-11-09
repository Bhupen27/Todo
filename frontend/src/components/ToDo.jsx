import { Button } from "./ui/button";
import axios from "axios";
import React from "react";

const ToDo = ({
  text,
  id,
  completed,
  setUpdateUI,
  setShowPopup,
  setPopupContent,
  onToggleComplete,
}) => {
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
    setPopupContent({ text, id });
    setShowPopup(true);
  };

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
        onChange={toggleComplete}
      />
      {text}
      <div className="icons flex gap-2">
        <Button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={updateToDo}
        >
          ✏️
        </Button>

        <Button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={deleteTodo}
        >
          ❌
        </Button>
      </div>
    </div>
  );
};

export default ToDo;
