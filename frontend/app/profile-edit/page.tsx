'use client';

import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faBan,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

function ProfileEditPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    risk_degree: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!token || !username) return;

      try {
        const response = await axios.post('/api/users/getUserDetails', { username }, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          password: '',
          risk_degree: response.data.risk_degree,
        });
      } catch (error) {
        // Handle error
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token found');
      return;
    }

    try {
      await axios.put('/api/users/update', formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      alert('Profile updated successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };
  const redirectToProfile = () => {
    router.push('/profile'); // Adjust this route according to your Next.js setup
  };
  const redirectToChat = () => {
    router.push('/chat-screen'); // Adjust this route according to your Next.js setup
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
            Ad
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={formData.first_name}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Soyad
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={formData.last_name}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Kullanıcı Adı
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={formData.username}
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
              disabled
            />
          </label>

          <label className="block text-blue-900 text-xs mb-1">
            Şifre
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="***"
              className="w-full h-full px-4 py-2 text-black rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-left"
              style={{ backgroundColor: '#D6E4FF' }}
            />
          </label>

        </form>
      </div>
      <div className="basis-1/3">
        <div className="flex items-right justify-end space-x-4 p-4">
          <button
            type="button"
            className="p-2 bg-blue-900 rounded-md"
            onClick={redirectToProfile}
          >
            <FontAwesomeIcon icon={faBan} size="2x" />
          </button>
          <button
            type="button"
            className="p-2 bg-blue-900 rounded-md"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faFloppyDisk} size="2x" />
          </button>
        </div>
      </div>
    </div>

  );
}

export default ProfileEditPage;
