import React, { useState } from "react";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";


function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  function handleTodo(e) {
    setTodo(e.target.value);
  }

  function handleAdd() {
    if (todo.trim() !== "") {
      setList((prevList) => [...prevList, todo]);
      setCompletedTask((prevTasks) => [...prevTasks, false]); // Initialize with false for new item
      setTodo("");
    }
  }

  function handleDelete(index) {
    const updatedList = list.filter((item, i) => i !== index);
    const updatedCompletedTasks = completedTask.filter((item, i) => i !== index);
    setList(updatedList);
    setCompletedTask(updatedCompletedTasks);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <div className="App">
      <div className='main'>
        <section id="todoList" >
          <header>
            <h1>
              Todo App
            </h1>
            <p>Completed: {completedTask.filter(item => item).length}/{list.length} </p>
          </header>
          <div className="row">
            <button onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} className="add" />
            </button>
            <div className='input'>
              <input
                type="text"
                placeholder="add a todo..."
                name="input"
                value={todo}
                onChange={(e) => handleTodo(e)}
                onKeyDown={handleKeyPress}
                className="inp-txt"
              />
            </div>
          </div>
          <ul>
            {list.map((item, index) => (
              <li className={`row align-center ${completedTask[index] ? "completed" : ""}`} key={index}>
                <span className='row align-center'>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={completedTask[index]}
                    onChange={() => {
                      const updatedTasks = [...completedTask];
                      updatedTasks[index] = !completedTask[index];
                      setCompletedTask(updatedTasks);
                    }}
                  />
                  <span className="item">{item}</span>
                </span>
                {/* <FontAwesomeIcon icon={faPencil} /> */}
                <button className="danger" onClick={() => handleDelete(index)}>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                    <line x1="18" y1="9" x2="12" y2="15"></line>
                    <line x1="12" y1="9" x2="18" y2="15"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
