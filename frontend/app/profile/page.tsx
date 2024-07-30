'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  const router = useRouter();
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
        const response = await axios.post(
          '/api/users/getUserDetails',
          { username }, // Pass username in the request body
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        setUser(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchUserData();
  }, []);

  const redirectToChat = () => {
    router.push('/chat-screen'); // Adjust this route according to your Next.js setup
  };

  const redirectToEdit = () => {
    router.push('/profile-edit'); // Adjust this route according to your Next.js setup
  };

  const redirectToRiskDegree = () => {
    router.push('/riskdegree'); // Adjust this route according to your Next.js setup
  };

  return (
    <div className="flex flex-row h-screen bg-blue-200">
      <div className="basis-1/3">
        <div className="flex items-center space-x-4 p-4">
          <button
            type="button"
            className="p-2 bg-blue-900 rounded-md"
            onClick={redirectToChat}
          >
            <FontAwesomeIcon icon={faComments} size="2x" />
          </button>
        </div>
      </div>
      <div className="basis-1/3 flex justify-center items-center">
        <form className="space-y-3">
          <label className="block text-blue-900 text-xs mb-1">
            Risk Derecesi
            {user.risk_degree ? (
              <input
                type="text"
                placeholder={user.risk_degree}
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                style={{ backgroundColor: '#D6E4FF' }}
                disabled
              />
            ) : (
              <button
                type="button"
                className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
                style={{ backgroundColor: '#D6E4FF' }}
                onClick={redirectToRiskDegree}
              >
                Risk analizi testini tamamlamak için tıklayınız.
              </button>
            )}
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Ad
            <input
              type="text"
              placeholder={user.first_name}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
              disabled
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Soyad
            <input
              type="text"
              placeholder={user.last_name}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
              disabled
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Kullanıcı Adı
            <input
              type="text"
              placeholder={user.username}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
              disabled
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Şifre
            <input
              type="password"
              placeholder="***"
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
              disabled
            />
          </label>
        </form>
      </div>
      <div className="basis-1/3">
        <div className="flex items-right justify-end space-x-4 p-4">
          <button
            type="button"
            className="p-2 bg-blue-900 rounded-md"
            onClick={redirectToEdit}
          >
            <FontAwesomeIcon icon={faUserPen} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
