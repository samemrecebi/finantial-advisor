import React from 'react';
import Image from 'next/image';

function ProfileEditPage() {
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
                placeholder="paulsmith"
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
                placeholder="***"
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
style={{ backgroundColor: '#D6E4FF' }}
              />
            </div>
          </foreignObject>

          {/* Save and Cancel Buttons */}
          <foreignObject x="92%" y="90%" width="300px" height="100px">

            <Image
              src="/save.png"
              alt="Save Profile"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </foreignObject>
          <foreignObject x="95%" y="90%" width="300px" height="100px">
            <Image
              src="/cancel.png"
              alt="Cancel"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export default ProfileEditPage;
