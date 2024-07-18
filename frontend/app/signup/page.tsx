import Link from 'next/link';
import Image from 'next/image';

function SignUpForm() {
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
          <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                className="block w-full p-2 rounded border text-black"
                placeholder="kullaniciadi"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                className="block w-full p-2 rounded border text-black"
                placeholder="kullanici.adi@ornek.com"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
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
          <p className="text-center text-sm">
            Zaten bir hesabınız var mı?
            {' '}
            <Link href="/signin" className="text-blue-400 hover:underline">
              Giriş Yap
            </Link>
          </p>
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
            className="btn btn-lg btn-primary text-white font-bold py-2 px-4 rounded mb-4"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUpForm;
