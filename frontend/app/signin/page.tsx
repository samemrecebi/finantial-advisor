"use client";
import Link from 'next/link';
import Image from 'next/image';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

function SignInForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('username', formData.get('username')?.toString() ?? '');
      localStorage.setItem('token', data.token);
      router.push('/chat-screen');
    } else {
      // Handle errors
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-indigo-400 text-white">
      {/* Arka planı isterseniz sonra bir resim vs. ile değiştirebiliriz */}
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-indigo-950 to-indigo-400 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="block text-white no-underline hover:opacity-80">
              <div className="flex items-center">
                <Image src="/logo.png" alt="Wealthify" width={77} height={61} />
                <div>
                  <div className="text-lg font-bold">Wealthify</div>
                  <div className="text-xs">Finans Asistanınız</div>
                </div>
              </div>
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Kullanıcı Adı
                <input
                  type="username"
                  name="username"
                  className="block w-full p-2 rounded border text-black"
                  placeholder="Kullanıcı Adı"
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
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-xs">Beni hatırla?</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Giriş Yap
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-white text-black rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h1 className="text-2xl font-bold mb-4">Tekrar Hoşgeldiniz!</h1>
          <p className="mb-4 text-sm">Giriş yaparak yolculuğunuza devam edin</p>
          <p className="mb-4 text-lg font-bold">VEYA</p>
          <p className="mb-4 text-sm">Hemen kayıt olun</p>
          <Link
            href="/signup"
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-indigo-700"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignInForm;
