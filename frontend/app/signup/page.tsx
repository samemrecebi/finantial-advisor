"use client";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

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
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-indigo-400 text-white">
      {/* Arka planı isterseniz sonra bir resim vs. ile değiştirebiliriz */}
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-indigo-950 to-indigo-400 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-6">
          <div className="flex justify-between items-center mb-2">
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
          <h1 className="text-2xl font-bold mb-2">Kayıt Ol</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                name="username"
                className="block w-full p-2 rounded border text-black"
                placeholder="Kullanıcı Adı"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Ad</label>
              <input
                type="text"
                name="firstName"
                className="block w-full p-2 rounded border text-black"
                placeholder="Ad"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Soyad</label>
              <input
                type="text"
                name="lastName"
                className="block w-full p-2 rounded border text-black"
                placeholder="Soyad"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                name="password"
                className="block w-full p-2 rounded border text-black"
                placeholder="********"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Şifreyi Onayla</label>
              <input
                type="password"
                className="block w-full p-2 rounded border text-black"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-3"
            >
              Kayıt Ol
            </button>
          </form>
          <p className="text-center text-sm">
            Zaten bir hesabınız var mı?{" "}
            <Link href="/signin" className="text-blue-400 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center bg-white text-black rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h1 className="text-2xl font-bold mb-4">Merhaba!</h1>
          <p className="mb-4 text-sm text-center">
            GPT4o modeli tarafından desteklenen özel finans asistanımızla bir yolculuğa çıkın
          </p>
          <p className="mb-4 text-lg font-bold">VEYA</p>
          <p className="mb-4 text-sm">Wealthify hesabınızla giriş yapın</p>
          <Link
            href="/signin"
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-indigo-700"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUpForm;
