import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Points = () => {

    const [points_myzia, setPoints_myzia] = useState(null);
    const [points_myzio, setPoints_myzio] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Wysyłamy zapytanie z tokenem w nagłówku
            axios.get(`https://strona-myzia-backend-production.up.railway.app/points`, {headers: {
                  Authorization: `Bearer ${token}`, 
                },})
              .then((response) => {
                setPoints_myzio(response.data.myzio);
                setPoints_myzia(response.data.myzia);  // Ustawiamy dane użytkownika
              })
              .catch((error) => {
                console.error('Błąd autoryzacji', error);
              });
          } else {
            console.log('Nie ma tokenu');
          }
        }, []);
      
        if (!myzia&&!myzio) return <p>Ładowanie...</p>;
    return (
        <div>
            <h1>Licznik punktów</h1>
            <div>
                <p>das</p>
            </div>
        </div>
    );
};

export default Points;