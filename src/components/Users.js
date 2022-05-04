import React, {useState, useEffect} from 'react'
import "./Users.css"
import axios from "axios"

export default function Users() {


    const [data, setData] = useState([]);
    const [errMsg, setErrMsg] = useState("");


    const url = "https://randomuser.me/api/";

    


    const nextUser = async (url) => {

        try {
            const res =  await axios.get(url);
             
          if(res.data.results) {
            setData(prevState => [...prevState, ...res.data.results])
                  
          }
        } catch (err) {
            setErrMsg("Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.")
        }      
    }

    const addTenUsers = () => {
        nextUser(`${url}?results=10`);
    }

    const genderFilter = () => {
        nextUser(`${url}?gender=female`);
    }

    useEffect(() => {
        nextUser(url);        
    }, []);// ! il runera une seule fois avec le tableau vide
    

    useEffect(() => {
        setErrMsg("")
    }, [])


  


    return !data ? ( <div>{""} <h1>Loading...</h1> </div> ) : (//! Si loading est à true afficher "Loading.." sinon faire le map pour chaque user
    <div className='users-container'>
         <div className='btns'>
            <button className='btn-add' onClick={addTenUsers}>Add</button>
            <button className='btn-fil' onClick={genderFilter}>Filter</button>
        </div>
        <div className="card-container">
             { 
        data.map((user, index) => ( 
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
       
       
        
    </div>
  )
 
  
}
