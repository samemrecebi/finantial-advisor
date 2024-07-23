'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

function SignInForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/chat-screen');
    } else {
      // Handle errors
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-dark text-white">
      {/* Arka planı isterseniz sonra bir resim vs. ile değiştirebiliriz */}
      <div className="flex flex-row bg-gradient-to-r from-indigo-950 to-indigo-400 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Fintech" width={77} height={61} />
              <div>
                <div className="text-lg font-bold">Fintech</div>
                <div className="text-xs">Finans asistanınız</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                E-posta
                <input
                  type="email"
                  name="email"
                  className="block w-full p-2 rounded border text-black"
                  placeholder="kullanici.adi@ornek.com"
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Şifre
                <input
                  type="password"
                  name="password"
                  className="block w-full p-2 rounded border text-black"
                  placeholder="********"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Giriş Yap
            </button>
          </form>
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-white text-black rounded-r-lg">
          <h1 className="text-2xl font-bold mb-4">Tekrar Hoşgeldiniz!</h1>
          <p className="mb-4 text-sm">Giriş yaparak yolculuğunuza devam edin</p>
          <p className="mb-4 text-lg font-bold">VEYA</p>
          <p className="mb-4 text-sm">E-postanızla kayıt olun</p>
          <Link
            href="/signup"
            className="btn btn-lg btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignInForm;
