import Image from 'next/image';
import Link from 'next/link';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col text-center bg-gradient-to-r from-indigo-200 to-indigo-400 shadow-lg">
      <header className="bg-gradient-to-r from-indigo-950 to-indigo-400 shadow-lg">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-blue-200 no-underline hover:opacity-80" href="/">
                <span className="sr-only">Home</span>
                <div className="flex items-center space-x-2">
                  <Image src="/logo.png" alt="Fintech" width={100} height={100} />
                  <div className="flex flex-col">
                    <div className="text-white text-sm font-bold">Fintech</div>
                    <div className="text-white text-[10px] font-bold">Finansal Asistanınız</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block h-5">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="no-underline text-blue-100 transition hover:text-gray-500/75" href="/">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link className="no-underline text-blue-100 transition hover:text-gray-500/75" href="/features">
                      Özellikler
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link className="rounded-md bg-blue-100 px-5 py-2.5 text-sm font-medium text-blue-600 shadow no-underline transition hover:bg-blue-200" href="/signin">
                    Giriş Yap
                  </Link>
                  <div className="hidden sm:flex">
                    <Link className="rounded-md bg-blue-100 px-5 py-2.5 text-sm font-medium text-blue-600 no-underline transition hover:bg-blue-200" href="/signup">
                      Kayıt Ol
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto my-48 max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-blue-900 md:text-4xl">
            Bir sonraki yatırımlarınızı ve daha fazlasını yeni Finansal AI asistanınımız ile bulun.
          </h2>
          <p className="hidden text-blue-600 md:mt-4 md:block">
            Başlamak için kayıt olun.
          </p>
          <div className="mt-4 md:mt-8">
            <Link href="/signup" className="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none no-underline focus:ring focus:ring-yellow-400">
              Kayıt ol
            </Link>
          </div>
        </div>
      </div>
      <footer className="mt-auto bg-gradient-to-r from-indigo-950 to-indigo-400 shadow-lg py-4">
        <p className="text-center text-white">© Fintech Financial Assistant 2024 All rights reserved</p>
      </footer>
    </div>
  );
}
export default HomePage;
