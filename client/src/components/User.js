import React, { useEffect, useState } from "react";
import style from '../style/User.module.css';
import { Link } from "react-router-dom";

import Upload from "./upload";


const User = ({setAuth}) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [state, setState] = useState("");
const [picture , usePicture] = useState("")
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
  const getEmail = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseData = await res.json();
      setEmail(parseData.email);
    } catch (err) {
      console.error(err.message);
    }
  };


 /*  const getPhoto = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token }
      });

      const parseData = await res.json();
      setPhoto(parseData.photo);
    } catch (err) {
      console.error(err.message);
    }
  }; */
  
  useEffect(()=>{
      getProfile()
  },[])

  useEffect(()=>{
    getEmail()
},[])

  /* useEffect(() => {
    getPhoto()
  }, []) */

 /*  useEffect(async ()=>{
  const docusList = await firebaseApp.firestore().collection("archivos").get();
  setDocus(docusList.docs.map((doc)=> doc.data()));
 
}, []) */
    return(
        <div className={style.todo}>
            <div className={style.navbar} >
              <div className={style.LinkBase}>
                <Link to='/dashboard' className={style.Link}> Go back</Link>
              </div>
              <div className={style.hache1}>
                <h1>My profile</h1>
              </div>
            </div>
            <div className={style.anteCard}>
            <div className={style.card}>
            <Upload setTodosChange={setTodosChange}state={state} usePicture={usePicture}/>
              <h4> Name
              <p> {name}</p>
              </h4>
              <h4>Email
              <p> {email}</p>
              </h4>
              
            </div>
            </div>
        </div>
    )
}

export default User;