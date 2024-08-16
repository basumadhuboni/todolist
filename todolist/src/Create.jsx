import React, { useState } from 'react'
import axios from 'axios'  

function Create() {
  const [task, setTask] = useState('')

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { task: task })//add method sends the task array to index.js '/add'
      .then(result => {
        location.reload()//the location got refreshed immediately with the result
      })
      .catch(err => console.log(err))
  }
  //whenever add button is pressed function handle add is called and request is sent to server to add task object to database 
  
  //e.target.value means whatever we have enterd in the input box should be taken as value for the task object
  //the task object's property is set as this new value using settask
  
  return (
    <div className="create-form">
      <input 
        type="text" 
        placeholder='Enter task' 
        value={task}
        onChange={(e) => setTask(e.target.value)}  
      />
      <button type="button" onClick={handleAdd}>Add</button> 
    </div>
  )
}

export default Create