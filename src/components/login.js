import React from 'react';
import profil from "../profile.jpg"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
          try {
            const response = await axios.post(`https://strona-myzia-backend-production.up.railway.app/login`, {email, password },    
            {headers: {'Content-Type': 'application/json',
          }});
          console.log('Logowanie zakończone sukcesem', response);
          localStorage.setItem('token', response.data.token); // Zapisanie tokenu w localStorage
          navigate('/profile'); // Po zalogowaniu przekierowanie do profilu
        } catch (err) {
          setError(err.response ? err.response.data : 'Wystąpił błąd');
        }
      };
    return (
        <div className='flex flex-col items-center justify-center font-myzia'>
            <img src={profil} alt="profil" className="rounded-full h-32 w-32 shadow-lg"></img>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Logownie</h1>
                <p className="text-sm"></p>

                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                
                <input type="email" value={email}   onChange={(e) => setEmail(e.target.value)}  required placeholder="Twój e-mail" className='border-2 boreder-red-500'></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  required placeholder="Twoje hasło" className='border-2 boreder-red-500'></input>
                <button type="submit" className='bg-red-500 text-white rounded  h-12 w-24 '>Zaloguj się</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>

                <Link to="/register">Zajerestuj się</Link>
        </div>
        </div>
    );
};

export default Login;