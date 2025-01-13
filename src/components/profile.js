import React from 'react';
import profil from "../profile.jpg"
const Profile = () => {

    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={profil} alt="profil" className="rounded-full h-32 w-32 shadow-lg"></img>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Myzia</h1>
        </div>
        </div>
    );
};

export default Profile;