import React from 'react';
import profil from "../profile.jpg"
import { Link } from 'react-router-dom';
const Login = () => {

    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={profil} alt="profil" className="rounded-full h-32 w-32 shadow-lg"></img>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Myzia</h1>
                <p className="text-sm"></p>
                <form className='flex flex-col items-center justify-center'>
                <input type="text" id="name" name="name" placeholder="Twoje imie" className='border-2 boreder-red-500'></input>
                <input type="text" id="mail" name="mail"placeholder="Twój e-mail" className='border-2 boreder-red-500'></input>
                <input type="password" id="password" name="password" placeholder="Twoje hasło" className='border-2 boreder-red-500'></input>
                <button type="submit" className='bg-red-500 text-white rounded  h-12 w-24 '>Zaloguj się</button>
                </form>
                <Link to="/register">Zajerestuj się</Link>
        </div>
        </div>
    );
};

export default Login;