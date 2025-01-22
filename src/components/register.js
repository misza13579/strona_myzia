import React from 'react';
import profil from "../profile.jpg"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Zatrzymanie domyślnego działania formularza (przeładowanie strony)
    
        try {
          const response = await axios.post(`https://strona-myzia-backend.railway.app/register`, { nick, email, password });
          console.log('Rejestracja zakończona sukcesem', response);
          navigate('/login'); // Po udanej rejestracji przekierowanie do logowania
        } catch (err) {
          setError(err.response ? err.response.data : err.message);
        }
      };

    
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={profil} alt="profil" className="rounded-full h-32 w-32 shadow-lg"></img>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Rejestracja</h1>
                <p className="text-sm"></p>

                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>

                <input type="text" value={nick} onChange={(e) => setNick(e.target.value)} placeholder="Twój nick" required className='border-2 border-red-500'></input>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Twój e-mail" required className='border-2 border-red-500'></input>
                <input type="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Twoje hasło" required className='border-2 border-red-500'></input>
                <button type="submit" className='bg-red-500 text-white rounded  h-12 w-24 '>Zajerestuj się</button>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
                </form>

                <a href=" " className='text-blue-500'>Zapomniałeś hasła?</a>
                <a href=" " className='text-blue-500'>Zajerestuj się</a>
        </div>
        </div>
    );
};

export default Register;