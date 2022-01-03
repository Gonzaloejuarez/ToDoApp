import React, { useEffect, useState } from "react";
import style from '../../../style/List.module.css'
import TodoEdit from "./Edit";



const TodoList = ({allTodos, setTodosChange}) => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  const deleteTodo = async id => {
    try {
        await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.jwt_token }
      });

      // setTodosChange(true);
      // setTodos(todos.filter(todo => todo.id !== id));
      window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <div className={style.todo}>
      {" "}
      <table className={style.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={style.ante}>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.id}>
              <td className={style.tdAhora}>{todo.description}</td>
              <td>
                <TodoEdit todo={todo} setTodosChange={setTodosChange}/>
              </td>
              <td>
                <div className={style.baseBoton}>
                <button
                  className={style.boton}
                  onClick={() => deleteTodo(todo.id)}
                  >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;