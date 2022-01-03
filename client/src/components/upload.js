import React, {useState} from "react"
import firebase from "../Firebase";

/* import {getStorage, ref , uploadBytes, getDownloadURL } from 'firebase/storage'; */

/* const storage = getStorage(); */

export const Upload = ({setTodosChange})=> {
    let [uploadValue, setUploadValue] = useState(0)
    let [namePhoto, setNamePhoto] = useState("");
    let [foto , setFoto] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [input, setInput] = useState("");
    /* let [state] */
    /*  async function handlerFile (e) {
    const archivoLocal = e.target.files[0];
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`)
    await uploadBytes(archivoRef, archivoLocal);
    urlDescarga = await getDownloadURL(archivoRef);
    } */

    const handleUpload = async(e)=>{
        try{
            

            const file = e.target.files[0];
            const storageRef = firebase.storage().ref().child(file.name);
        
            storageRef.put(file).on("state_changed", snapshot => {
            let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            setUploadValue(uploadValue = percentage)
            }, err => console.error(err), async () => {
            const url = await storageRef.getDownloadURL(file.name);
            
            if(url){
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("jwt_token", localStorage.jwt_token);
          
                  const response =  await fetch(`http://localhost:5000/user/photo`, {
                  method: "POST",
                  headers: myHeaders,
                });
                const jsonData = await response.json();
                setAllTodos(jsonData)
                setTodosChange(true)   
                setInput("");
        }
            setFoto(foto=url)
            setNamePhoto(namePhoto = file.name);
            console.log(setFoto)
        })
        }
        catch(error){
            console.log(error.message)
        } 
    }
    
    

    return(
        <div className="UploadContainer">
        <div className="SubContainer">
            <img src={foto} alt="Producto" style={{width:"100px"}}/>
            <input type="file" onChange={handleUpload} />
        </div>            
        <progress value={uploadValue} max="100"></progress>
        <h3 style={{color:"black"}}>{namePhoto}</h3>
        </div>
    )
 }
 export default Upload