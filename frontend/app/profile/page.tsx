import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

async function reciveUserData() {
  const cookieStore = cookies();
  const username = cookieStore.get('username')?.value;
  const response = await fetch('http://localhost:3001/api/users/getUserDetails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
  const userData = await response.json();
  return userData;
}

async function ProfilePage() {
  const userData = await reciveUserData();
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
          <foreignObject x="43%" y="40%" width="1000px" height="40px">
            <div className="text-white text-xl font-bold">
              Risk-Averse Investor
            </div>
          </foreignObject>
          <foreignObject x="41%" y="53%" width="240px" height="40px">
            <div className="relative">
              <label className="absolute left-0 -top-6 text-white">First Name</label>
              <input
                type="text"
                placeholder="Paul"
                defaultValue={userData.first_name}
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                style={{ backgroundColor: '#D6E4FF' }}
                disabled
              />
            </div>
          </foreignObject>
          <foreignObject x="41%" y="64%" width="240px" height="40px">
            <div className="relative">
              <label className="absolute left-0 -top-6 text-white">Last Name</label>
              <input
                type="text"
                placeholder="Smith"
                defaultValue={userData.last_name}
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                style={{ backgroundColor: '#D6E4FF' }}
                disabled
              />
            </div>
          </foreignObject>
          <foreignObject x="41%" y="75%" width="240px" height="40px">
            <div className="relative">
              <label className="absolute left-0 -top-6 text-white">Username</label>
              <input
                type="text"
                placeholder="paulsmith"
                defaultValue={userData.username}
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                style={{ backgroundColor: '#D6E4FF' }}
                disabled
              />
            </div>
          </foreignObject>
          <foreignObject x="41%" y="86%" width="240px" height="40px">
            <div className="relative">
              <label className="absolute left-0 -top-6 text-white">Password</label>
              <input
                type="password"
                placeholder="***"
                defaultValue={userData.password}
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
                width={100} // Adjust the width as needed
                height={100} // Adjust the height as needed
                className="cursor-pointer"
              />

            </Link>
          </foreignObject>

        </svg>
      </div>
    </div>
  );
}

export default ProfilePage;
