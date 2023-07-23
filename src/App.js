import React, { useState } from "react";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";


function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  function handleTodo (e) {
    setTodo(e.target.value);
  }

  function handleAdd() {
    if (todo.trim() !== "") {
      setList((prevList) => [...prevList, todo]);
      setTodo("");
    }
  }

  function handleDelete(index) {
    const updatedList = list.filter((item, i) => i !== index);
    setList(updatedList);
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
            <p>Completed: 0/{list.length} </p>
          </header>

          <button onClick={handleAdd}>
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path>
              </svg>
            </span>
          </button>
          <div className='input'>
            <input
              type="text"
              placeholder="add a todo..."
              name="input"
              value={todo}
              onChange={(e) => handleTodo(e)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <ul>
            {list.map((item, index) => (
              <li key={index}> 
                <span className='completed'>
                  <input id={`checkbox-${index}`} type="checkbox" />
                  {item}
                </span>
           
                
                  <FontAwesomeIcon icon={faPencil}  />
             
                <button className="danger" onClick={()=>handleDelete(index)}>
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
