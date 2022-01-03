import React, { useState } from "react";
import { toast } from "react-toastify";
import style from '../../../style/Create.module.css';
const TodoCreate = ({setTodosChange}) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    
    try {
      const body = { description };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.jwt_token);

      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });
      
      toast.error(await response.json());
      setTodosChange(true);
      setDescription("");
      // window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.todo}>
      <div className={style.base}>
      <h1>Todo List</h1>
      <form onSubmit={onSubmitForm} className={style.formulario}>
        <input
          type="text"
          className="form-control"
          value={description}
          placeholder="Add Todo"
          onChange={e => setDescription(e.target.value)}
          />
        <button>Add</button>
      </form>
          </div>
    </div>
  );
};

export default TodoCreate;