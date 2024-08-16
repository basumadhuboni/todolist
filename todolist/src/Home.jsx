import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  //todos array is created that contains multiple todo objects
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        // Update local state to reflect changes
        setTodos(todos.map(todo => (todo._id === id ? result.data : todo)));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Remove deleted todo from state
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
      <div className="home"> {/* Applying the "home" class here */}
        <div className="list">
          <Create />
          {
            todos.length === 0 ? (
              <div><h2>List Empty....</h2></div>
            ) : (
              todos.map(todo => (
                <div className="task" key={todo._id}>
                  <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                    {todo.done ? <BsFillCheckCircleFill className="icon" /> 
                    : <BsCircleFill className="icon" />}
    
                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                    <BsFillTrashFill 
                      className="trash-icon" 
                      onClick={() => handleDelete(todo._id)} 
                    />
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
    
}

export default Home;
