'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

function SignUpForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const first_name = formData.get('firstName');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const last_name = formData.get('lastName');

    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username, password, first_name, last_name,
      }),
    });

    if (response.ok) {
      router.push('/signin');
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
              <Image src="/logo.png" alt="Wealthify" width={77} height={61} />
              <div>
                <div className="text-lg font-bold">Wealthify</div>
                <div className="text-xs">Finans asistanınız</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Ad
              </label>
              <input
                type="text"
                placeholder="John"
                className="block w-full p-2 rounded border text-black"
                name="firstName"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Soyad
              </label>
              <input
                type="text"
                placeholder="Appleseed"
                className="block w-full p-2 rounded border text-black"
                name="lastName"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1"> Kullanıcı Adı </label>
              <input
                type="username"
                name="username"
                className="block w-full p-2 rounded border text-black"
                placeholder="J.Appleseed01"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                name="password"
                className="block w-full p-2 rounded border text-black"
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Şifreyi Onayla
              </label>
              <input
                type="password"
                className="block w-full p-2 rounded border text-black"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Kayıt Ol
            </button>
          </form>
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-white text-black rounded-r-lg">
          <h1 className="text-2xl font-bold mb-4">Merhaba!</h1>
          <p className="mb-4 text-sm text-center">
            OpenAI tarafından desteklenen özel finans asistanımızla bir
            yolculuğa çıkın
          </p>
          <p className="mb-4 text-lg font-bold">VEYA</p>
          <p className="mb-4 text-sm">Fintech hesabınızla giriş yapın</p>
          <Link
            href="/signin"
            className="btn btn-lg btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUpForm;
