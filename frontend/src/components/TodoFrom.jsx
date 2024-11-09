import axios from "axios";
import React, { useState} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TodoFrom = ({setUpdateUI}) => {
  const [input, setInput] = useState("");
 
  const saveToDo = () => {
    axios
      .post(`http://localhost:5000/api/save`, { toDo: input })
      .then((res) => {
        setInput("");
        setUpdateUI((prevState) => !prevState); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex gap-2 w-full mb-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add a ToDo..."
        className="w-full"
      />
      <Button onClick={saveToDo}>Add</Button>
    </div>
  );
};

export default TodoFrom;
