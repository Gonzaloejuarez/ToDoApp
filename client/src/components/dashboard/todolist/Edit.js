import React, { Fragment, useState } from "react";
import {Modal, Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import style from '../../../style/Edit.module.css';
const styles = makeStyles((theme) => ( {
  modal : {
   position: 'absolute',
   width : 400,
   backgroundColor : 'white',
   border: '2px solid #000',
   boxShadow : theme.shadows[5],
   padding : "16px 32px 24px",
   top: '50%',
   left : "50%",
   transform : 'translate(-50% , -50%)'
},
  textfield : {
    width : '100%'
  },
  button : {
    textAlign : 'center'
  }
}))


const TodoEdit = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);
  const newStyles = styles();
  const [user, setUser] = useState(false);
  //edit description function
  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.jwt_token);

      await fetch(
        `http://localhost:5000/dashboard/todos/${todo.id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
        }
      );

      setTodosChange(true);
      // window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };

  const body = (
    <div className={newStyles.modal}>
      <div align="center">
            Edit description
      </div>
      <div className={style.tdAhora}
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      ></div>
      <div>
        <TextField className={newStyles.textfield} label='Edit description'className={newStyles.TextField} value={description} onChange={e => setDescription(e.target.value)}/>
      </div>
      <div align='right'>
      <Button color='primary' onClick={e => updateDescription(e)}>Edit</Button> 
      <Button variant="contained" 
 color="success" onClick={() => apretarCerrar()}>Close</Button>
      </div>
    </div>
  )


  const apretarCerrar = () => {
    setUser(!user)
  }

  return (
    <Fragment className={style.todo}>
      <div className={style.baseBoton}>
      <button
        className={style.boton}
        data-target={`#id${todo.id}`}
        onClick={() => apretarCerrar()}
        >
        Edit
      </button>
      </div>
      <Modal
      open={user}
      onClose={apretarCerrar}
      >
        {body}
      </Modal>
      {/* <div
        className={newStyles.modal}
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default TodoEdit;