import React, {useState, useEffect} from 'react'
import "./Users.css"
import axios from "axios"

export default function Users() {


    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState("Loading...");
    


    const url = "https://randomuser.me/api/";

    


    const nextUser = async (url) => {

        try { // le try catch permet la gestion d'erreur
          const res =  await axios.get(url);            
          if(res.data.results) {
            setUsers(prevState => [...prevState, ...res.data.results]) // Pour le setData j'ai initialisé un state 
          }
        } catch (err) {
            setErrMsg("Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.")
        }      
    };

    const addTenUsers = () => {
        nextUser(`${url}?results=10`);
    };

    const genderFilter = () => {
        let result = [];
        result = users.filter((res) => res.gender === "female") // retourne un tableau en fonction de la condition // La fonction filter va parcourir tous les éléments de montableau data
        //   de mon tableau et vérifier la clé gender (correspondante à female) et retourne un tableau correspondant à cette condition et les retourner dans mon tableau results 
        setUsers(result) // On re sate le data
    };

    useEffect(() => {
        nextUser(url);        
    }, []);// ! il runera une seule fois avec le tableau vide
    

    return  (
    <div className='users-container'>
        
        {users.length === 0 ?  <h1>{errMsg}</h1>  :
        <>
        <div className='btns'>
            <button className='btn-add' onClick={addTenUsers}>Add</button>
            <button className='btn-fil' onClick={genderFilter}>Filter</button>
        </div>
        <div className="card-container"> 
        {/* le map prend mon tableau de depart et me retourne ce meme tableau modifié selon ce que je veux, il va appliquer au User tous que je lui demande*/}
            { users.map((user, index) => (  
                < div key={index} className="card">
                    <img src={user.picture.large} alt="User-pic" />
                    <p  className="card-description">Email :{user.email}</p>
                    <p className='card-description'>Ville :{user.location.city}</p>
                    <p className='card-description'>Tel :{user.cell}</p>
                    <p className='card-description'>Prénom :{user.name.first}</p>
                    <p className='card-description'>Nom :{user.name.last}</p>
                </div>    
            ))}
        </div>
        </>
        }    
    </div>
  )
}
