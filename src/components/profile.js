import React, { useState, useEffect } from 'react';
import profil from "../profile.jpg"
import axios from 'axios';
const Profile = () => {

    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Wysyłamy zapytanie z tokenem w nagłówku
            axios.get(`http://localhost:3000`, {headers: {
                  Authorization: `Bearer ${token}`, 
                },})
              .then((response) => {
                setUser(response.data);  // Ustawiamy dane użytkownika
              })
              .catch((error) => {
                console.error('Błąd autoryzacji', error);
              });
          } else {
            console.log('Nie ma tokenu');
          }
        }, [API_URL]);
      
        if (!user) return <p>Ładowanie...</p>;

    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={profil} alt="profil" className="rounded-full h-32 w-32 shadow-lg"></img>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Myzia</h1>
                <p>Nick: {user.nick}</p>
                <p>Email: {user.email}</p>
        </div>
        </div>
    );
};

export default Profile;