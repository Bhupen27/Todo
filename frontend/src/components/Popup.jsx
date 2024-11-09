import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState(popupContent.text);

  const updateToDo = () => {
    axios
      .put(`http://localhost:5000/api/update/${popupContent.id}`, { toDo: input })
      .then((res) => {
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };

  return (
    <div className="flex justify-center items-center ">
  <div className="bg-[#afc7ea] w-full max-w-2xl shadow-md rounded-lg px-4 py-3 mx-4">
    <RxCross1 className="cursor-pointer" onClick={() => setShowPopup(false)} />
    <h1 className="text-center mb-4 font-bold text-lg">Update ToDo</h1>
    
    <div className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Update ToDo..."
        className="flex-grow"
      />
      <Button onClick={updateToDo} className="flex-shrink-0">
        Update
      </Button>
    </div>
  </div>
</div>

  );
};

export default Popup;