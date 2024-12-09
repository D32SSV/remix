import React, { useState } from "react";

const DraggableInputs = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text", id); 
    e.target.style.opacity = "0.5"; 
    setDraggedItem(id); 
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.target.style.opacity = "1"; 
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow dropping
    e.target.classList.add("over"); 
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.target.classList.remove("over");
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.target.classList.remove("over");

    const draggedId = e.dataTransfer.getData("text"); 

    if (draggedId === targetId) {
      const draggedElement = document.getElementById(draggedId);
      e.target.appendChild(draggedElement!); 
      const questionElement = (document.getElementById(
        "input1"
      ) as HTMLTextAreaElement).value;
      const options = [
        (document.getElementById("input2") as HTMLInputElement).value,
        (document.getElementById("input3") as HTMLInputElement).value,
        (document.getElementById("input4") as HTMLInputElement).value,
        (document.getElementById("input5") as HTMLInputElement).value,
      ];
      // console.log("OPTIONS>>", options);
      
      const answer = (document.getElementById("answer") as HTMLInputElement).value;
      if(options.indexOf("") === -1)
      {
        const response = await fetch("/api/save-dropped-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            droppedElement: draggedId,
            targetId,
            question: questionElement, 
            options: options,
            answer,
          }),
        });
  
        const result = await response.json();
        if (result.success) {
          console.log("All Data saved successfully");
        } else {
          console.error("Error saving data");
        }
      }
    } else {
      alert("Drop to corresponding box only!");
    }
  };

  return (
    <div className="drag-drop-container flex">
      <div className="flex flex-col">
        <div className="w-[45vw] h-[45vh] flex flex-col items-center">
          <textarea
            placeholder="Type Question here"
            id="input1"
            className="draggable w-60 h-24"
            draggable
            onDragStart={(e) => handleDragStart(e, "input1")}
            onDragEnd={handleDragEnd}
          ></textarea>

          <div className="grid grid-rows-2 grid-cols-2">
            <input
              placeholder="Type Option 1"
              id="input2"
              className="draggable w-44 h-16 w-44 h-16"
              draggable
              onDragStart={(e) => handleDragStart(e, "input2")}
              onDragEnd={handleDragEnd}
            />
            <input
              placeholder="Type Option 2"
              id="input3"
              className="draggable w-44 h-16"
              draggable
              onDragStart={(e) => handleDragStart(e, "input3")}
              onDragEnd={handleDragEnd}
            />
            <input
              placeholder="Type Option 3"
              id="input4"
              className="draggable w-44 h-16"
              draggable
              onDragStart={(e) => handleDragStart(e, "input4")}
              onDragEnd={handleDragEnd}
            />
            <input
              placeholder="Type Option 4"
              id="input5"
              className="draggable w-44 h-16"
              draggable
              onDragStart={(e) => handleDragStart(e, "input5")}
              onDragEnd={handleDragEnd}
            />
            <input
              placeholder="Confirm Answer"
              id="answer"
              className="draggable w-44 h-16"
            />
          </div>
        </div>
        {/* <button onClick={()=>handleDrop}>Post Question</button> */}
      </div>

      <div className="flex flex-col items-center">
        <div
          id="drop1"
          className="droppable w-full placeholder-div"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "input1")}
          placeholder="Type Options"
        ></div>
        <div className="grid grid-rows-2 grid-cols-2">
          <div
            id="drop2"
            className="droppable placeholderOptionsDiv"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "input2")}
          >
            Option 1
          </div>
          <div
            id="drop3"
            className="droppable placeholderOptionsDiv"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "input3")}
          >
            Option 2
          </div>
          <div
            id="drop4"
            className="droppable placeholderOptionsDiv"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "input4")}
          >
            Option 3
          </div>
          <div
            id="drop5"
            className="droppable placeholderOptionsDiv"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "input5")}
          >
            Option 4
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableInputs;
