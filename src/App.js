import React, { useState, useEffect } from "react";

import "./Styles.css";
function App() {
   const [task, setTask] = useState([]);
   const [currentTask, setCurrentTask] = useState("");
   const [editable, setEditable] = useState(false);
   const [editId, setEditId] = useState(0);
   const [editTask, setEditTask] = useState("");
   useEffect(() => {
      const url = "http://localhost:9999/getTodo";
      fetch(url)
         .then((r) => r.json())
         .then((r) => {
            console.log(r.data);
            setTask([...r.data]);
         });
   }, []);
   const update = () => {
      const url = "http://localhost:9999/getTodo";
      fetch(url)
         .then((r) => r.json())
         .then((r) => {
            console.log(r.data);
            setTask([...r.data]);
         });
   };
   const addHandler = async () => {
      const url = "http://localhost:9999/saveTodo";
      fetch(url, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            task: currentTask,
         }),
      }).then((r) => {
         // console.log(r);
         if (r.ok) {
            update();
         }
      });
      // let arr = [...task];
      // arr.push(currentTask);
      // setTask([...arr]);
   };
   const deleteHandler = async (id) => {
      const url = "http://localhost:9999/deleteTodo";
      await fetch(url, {
         headers: {
            "Content-Type": "application/json",
            id: id,
         },
         method: "delete",
      }).then((r) => {
         if (r.ok) {
            update();
            console.log("deleted");
         }
      });
      // let myarr = [...task];
      // myarr.splice(index, 1);
      // setTask([...myarr]);
   };
   const editHandler = async () => {
      const url = "http://localhost:9999/updateTodo";
      await fetch(url, {
         headers: {
            "Content-Type": "application/json",
         },
         method: "put",
         body: JSON.stringify({
            newTask: editTask,
            id: editId,
         }),
      }).then((r) => {
         if (r.ok) {
            update();
            console.log("update successfuly");
         }
      });
      // let arr = [...task];
      // arr.splice(editIndex, 1, value);
      // setTask([...arr]);
   };
   return (
      <div className="container">
         <h1>My Todo App</h1>
         {!editable ? (
            <>
               <div className="headerContainer">
                  <input
                     onChange={(event) => {
                        setCurrentTask(event.target.value);
                     }}
                     value={currentTask}
                  ></input>
                  <button
                     onClick={() => {
                        addHandler();
                        setCurrentTask("");
                     }}
                  >
                     add
                  </button>
               </div>
               {task.map((value) => {
                  return (
                     <div className="itemContainer" key={`${value._id}`}>
                        <div className="item">{value.task}</div>
                        <button
                           className="item"
                           onClick={() => {
                              setEditable(!editable);
                              setEditId(value._id);
                           }}
                        >
                           edit
                        </button>
                        <button
                           className="item"
                           onClick={() => {
                              deleteHandler(value._id);
                           }}
                        >
                           delete
                        </button>
                     </div>
                  );
               })}
            </>
         ) : (
            <div className="headerContainer">
               <input
                  value={editTask}
                  onChange={(event) => {
                     setEditTask(event.target.value);
                  }}
               ></input>
               <button
                  onClick={() => {
                     editHandler();
                     setEditTask("");
                     setEditable(!editable);
                  }}
               >
                  update
               </button>
            </div>
         )}
      </div>
   );
}

export default App;
