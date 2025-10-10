// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
   const [characters, setCharacters] = useState([]);

   function removeOneCharacter(index) {
     const userId = characters[index].id;

     fetch(`http://localhost:8000/users/${userId}`, {
       method: "DELETE",
     })
       .then((response) => {
         if (response.status === 204) {
           // Only update the frontend if deletion succeeded
           const updated = characters.filter((_, i) => i !== index);
           setCharacters(updated);
         } else if (response.status === 404) {
           console.log("User not found on backend");
         }
       })
       .catch((error) => {
         console.log(error);
       });
   }


   function updateList(person) {
     postUser(person)
       .then((res) => {
         if (res.status === 201) return res.json(); // parse the response
         else throw new Error("Failed to add user");
       })
       .then((newUserWithId) => {
         setCharacters([...characters, newUserWithId]); // use the object with ID
       })
       .catch((error) => console.log(error));
   }

   
   function fetchUsers() {
     const promise = fetch("http://localhost:8000/users");
     return promise;
   }

   function postUser(person) {
     const promise = fetch("Http://localhost:8000/users", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(person),
     });

     return promise;
   }

   useEffect(() => {
     fetchUsers()
	     .then((res) => res.json())
	     .then((json) => setCharacters(json["users_list"]))
	     .catch((error) => { console.log(error); });
   }, [] );

   return (
     <div className="container">
       <Table
         characterData={characters}
         removeCharacter={removeOneCharacter}
       />
       <Form handleSubmit={updateList} />
     </div>
   );
}

export default MyApp;
