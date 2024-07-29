'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        risk_degree: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username'); // Assuming username is stored in localStorage

            if (!token || !username) return;

            try {
                const response = await axios.post('http://localhost:3001/api/users/getUserDetails', 
                    { username }, // Pass username in the request body
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen flex justify-end items-center body">
            <div className="bg-[#D6E4FF] mr-0">
                <svg width="100vw" height="100vh">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1D39C4" /> 
                            <stop offset="100%" stopColor="#030852" />
                        </linearGradient>
                    </defs>
                    <circle cx="1250" cy="350" r="1000" fill="url(#gradient)" />
                    <circle cx="50%" cy="24%" r="120" fill="#FFFFFF" />
                    <foreignObject x="5" y="2" width="150px" height="150px">
                        <div>
                        <Link href="/chat-screen">
                            <Image
                                src="/logo.png"
                                alt="menu"
                                width={150} 
                                height={150} 
                            />
                            </Link>
                        </div>

                    </foreignObject>


                    
                    <foreignObject x="41%" y="45%" width="240px" height="60px">
                        <div className="relative">
                            <label className="block text-white text-xs mb-1">Ad</label>
                            <input
                                type="text"
                                placeholder={user.first_name}
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                                disabled
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="57%" width="240px" height="60px">
                        <div className="relative">
                            <label className="block text-white text-xs mb-1">Soyad</label>
                            <input
                                type="text"
                                placeholder={user.last_name}
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                                disabled
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="69%" width="240px" height="60px">
                        <div className="relative">
                            <label className="block text-white text-xs mb-1">Kullanıcı Adı</label>
                            <input
                                type="text"
                                placeholder={user.username}
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left" 
                                style={{ backgroundColor: '#D6E4FF' }}
                                disabled
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="81%" width="240px" height="60px">
                        <div className="relative">
                            <label className="block text-white text-xs mb-1">Şifre</label>
                            <input
                                type="password"
                                placeholder="***"
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"                                 
                                style={{ backgroundColor: '#D6E4FF' }}
                                disabled
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="90%" y="88%" width="300px" height="100px">
                        <Link href="/profileedit">
                            <Image
                                src="/edit.png" // Ensure this path is correct
                                alt="Edit Profile"
                                width={35} // Adjust the width as needed
                                height={35} // Adjust the height as needed
                                className="cursor-pointer"
                            />
                        </Link>
                    </foreignObject>
                    <foreignObject x="88%" y="94%" width="1000px" height="40px">
                        <div className="text-white text-xs font-bold">
                            Profili Düzenle
                        </div>
                    </foreignObject>
                    
                </svg>
            </div>
        </div>
    );
};

export default ProfilePage;
