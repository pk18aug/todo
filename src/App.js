import React, { useMemo, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./icons/DeleteButton";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  function handleTodoChange(e) {
    setTodo(e.target.value);
  }

  function handleAdd() {
    if (todo.trim() !== "") {
      setList((prevList) => [...prevList, { text: todo, completed: false }]);
      setTodo("");
    }
  }

  function handleDelete(index) {
    setList((prevList) => prevList.filter((item, i) => i !== index));
  }

  function handleToggleComplete(index) {
    setList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );  
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleAdd();
    }
  }
  const completedTasksCount = useMemo(() => list.filter(item => item.completed).length, [list]);
  return (
    <div className="App">
      <div className='main'>
        <section id="todoList" >
          <header>
            <h1> 
              Todo App
            </h1>
            <p>Completed: {completedTasksCount}/{list.length} </p>
          </header>
          <div className="row">
            <div className='input'>
              <input
                type="text"
                placeholder="add a todo..."
                name="input"
                value={todo}
                onChange={handleTodoChange}
                onKeyDown={handleKeyPress}
                className="inp-txt"
              />
            </div>
            <button onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} className="add" />
            </button>
          </div>
          <ul>
            {list.map((item, index) => (
              <li
                className={`row align-center ${item.completed ? "completed" : ""}`}
                key={index}
              >
                <span className='row align-center'>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleComplete(index)}
                  />
                  <span className="item">{item.text}</span>
                </span>
                {/* <FontAwesomeIcon icon={faPencil} className="update" /> */}
                <button className="danger" onClick={() => handleDelete(index)}>
                 <DeleteButton/>
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
