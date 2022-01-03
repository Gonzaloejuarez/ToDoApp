import React, {useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import style from '../style/Login.module.css'
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("jwt_token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={style.todo}>
      <div className={style.base}>
      <p className="mt-5 text-center">Sign in</p>
      <form onSubmit={onSubmitForm} className={style.formulario}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
          />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
          />
        <button className={style.boton}>Sign In</button>
      </form>
      <div className={style.links}>
      <Link to="/register"  className={style.linkBoton}  > You do not have an account? Sign up</Link> 
      {/* <Link to='/' >go back to the main page</Link>  */}
      </div>
      <Link to='/' >  Go start</Link> 
      </div>
    </div>
  );
};

export default Login;