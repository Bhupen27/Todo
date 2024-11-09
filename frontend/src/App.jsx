import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoFrom from "./components/TodoFrom.jsx";
import Popup from "./components/Popup.jsx";
import ToDo from "./components/ToDo.jsx";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const toggleComplete = (id, completed) => {
    setToDos((prevState) =>
      prevState.map((todo) =>
        todo._id === id ? { ...todo, completed } : todo
      )
    );
  };

  return (
    <>
    <div className="bg-[#5084d2] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 ">
    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
    </h1>
      <TodoFrom setUpdateUI={setUpdateUI}/>
      {toDos.map((el) => (
      <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              completed={el.completed}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
              onToggleComplete={toggleComplete}
      />
          ))}
        
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
      </div>
      </div>
    </>
  );
};

export default App;