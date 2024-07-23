'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const ProfileEditPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        risk_degree: '', // Added risk_degree field
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (!token || !username) return;

            try {
                const response = await axios.post('http://localhost:3001/api/users/getUserDetails', { username }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFormData({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    username: response.data.username,
                    password: '', // It is generally not safe to show the password in the form
                    risk_degree: response.data.risk_degree, // Added risk_degree field
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put('http://localhost:3001/api/users/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert('Failed to update profile');
        }
    };

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
                    <circle cx="50vw" cy="12vw" r="120" fill="#FFFFFF" />
                    <foreignObject x="35" y="40" width="50px" height="50px">
                        <div>
                            <Image
                                src="/menu.png"
                                alt="menu"
                                width={40} 
                                height={40} 
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="49%" width="240px" height="40px">
                        <div className="relative">
                            <label className="absolute left-0 -top-6 text-white">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Paul"
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="61%" width="240px" height="40px">
                        <div className="relative">
                            <label className="absolute left-0 -top-6 text-white">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Smith"
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="73%" width="240px" height="40px">
                        <div className="relative">
                            <label className="absolute left-0 -top-6 text-white">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder={formData.username}
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="85%" width="240px" height="40px">
                        <div className="relative">
                            <label className="absolute left-0 -top-6 text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="***"
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="41%" y="97%" width="240px" height="40px">
                        <div className="relative">
                            <label className="absolute left-0 -top-6 text-white">Risk Degree</label>
                            <input
                                type="text"
                                name="risk_degree"
                                value={formData.risk_degree}
                                onChange={handleChange}
                                placeholder="Low"
                                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                                style={{ backgroundColor: '#D6E4FF' }}
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="92%" y="90%" width="300px" height="100px">
                        <div onClick={handleSubmit}>
                            <Image
                                src="/save.png" 
                                alt="Save Profile"
                                width={40} 
                                height={40}
                                className="cursor-pointer"
                            />
                        </div>
                    </foreignObject>
                    <foreignObject x="95%" y="90%" width="300px" height="100px">
                        <Link href="/">
                            <Image
                                src="/cancel.png" 
                                alt="Cancel"
                                width={50} 
                                height={50} 
                                className="cursor-pointer"
                            />
                        </Link>
                    </foreignObject>
                </svg>
            </div>
        </div>
    );
};

export default ProfileEditPage;
