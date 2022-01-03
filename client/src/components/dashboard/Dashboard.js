import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import style from '../../style/Dashboard.module.css';
//components
import TodoCreate from "./todolist/Create";
import TodoList from "./todolist/List";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseData = await res.json();
      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwt_token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSearchResult = async e => {
    e.preventDefault();
    
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.jwt_token);

      const response = await fetch(`http://localhost:5000/dashboard/todos/search?description=${description}`, {
        method: "GET",
        headers: myHeaders
      });

      const jsonData = await response.json();
      setAllTodos(jsonData);
      setDescription("")
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/todos",{
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });
      const jsonData = await response.json();

      setAllTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getTodos();
    setTodosChange(false);
  }, [todosChange]);
  
  return (
    <div className={style.todoInicio}>
      <div className={style.navbar}>
        <Link to='/user' className={style.Nameusuario}> <h2>User {name}</h2></Link>
        {/* <h2>User {name}</h2> */}
      <form onSubmit={getSearchResult} className={style.formulario}>
        <div className={style.divInput}>
        <input
          type="text"
          className="form-control"
          value={description}
          placeholder="Search Todo..."
          onChange={e => setDescription(e.target.value)}
          />
        <button className={style.buttonSearch}>Search</button>
        </div>
      </form>
        <button onClick={e => logout(e)} className={style.boton}>
          Logout
        </button> 
      </div>
      <TodoCreate setTodosChange={setTodosChange} />
      <TodoList allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;