import React from "react";
import { Link } from "react-router-dom";
import style from '../style/Landing.module.css';

const Landing = () => {
  return (
    <div className={style.todo}>
      <div className={style.Landing}>
      <h1>Welcome to My tasks </h1>
      <p>please login or register</p>
      <div className={style.botones}>
      <Link to="/login" className={style.boton}>
        Login
      </Link>
      <Link to="/register" className={style.boton}>
        Register
      </Link>
      </div>
      </div>
    </div>
  );
};

export default Landing;