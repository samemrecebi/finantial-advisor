'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

/* Nav sistemi ile güncellendi */
const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Özellikler', href: '#features' },
];

function HomePage() {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowHeader(prevScrollpos > currentScrollPos || currentScrollPos < 10);
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-center bg-gradient-to-r from-indigo-200 to-indigo-400 shadow-lg">
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950 to-indigo-400 shadow-lg transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-blue-200 no-underline hover:opacity-80" href="/">
                <span className="sr-only">Home</span>
                <div className="flex items-center space-x-2">
                  <Image src="/logo.png" alt="Wealthify" width={100} height={100} />
                  <div className="flex flex-col">
                    <div className="text-white text-sm font-bold">Wealthify</div>
                    <div className="text-white text-[10px] font-bold">Finans AI Asistanınız</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block h-5">
                <ul className="flex items-center gap-6 text-sm">
                  {/* Nav sistemi ile güncellendi */ }
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        className="relative no-underline text-blue-100 transition hover:text-gray-500/75-after:content-[''] after:block after:w-0 after:h-0.5 after:bg-blue-100 after:transition-all after:duration-300 after:hover:w-full"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow no-underline transition hover:bg-indigo-700" href="/signin">
                    Giriş Yap
                  </Link>
                  <div className="hidden sm:flex">
                    <Link className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-indigo-700" href="/signup">
                      Kayıt Ol
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* MOBILE HEROSU DÜZENLENMESİ GEREK */}

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">
              Bir sonraki yatırımlarınızı ve daha fazlasını yeni Finansal AI asistanınınız ile bulun.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-900">Başlamak için kayıt olun</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Kayıt Ol
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Daha fazlası
                {' '}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="p-12 bg-gradient-to-r from-indigo-950 to-indigo-400">
        <div className="relative z-10">
          <h3 className="text-5xl font-bold text-white mb-20">Özellikler</h3>
          <div className="space-y-40">
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Yatırım Önerileri</h4>
              <p className="text-white">Finansal AI asistanınız, yatırım hedeflerinize göre en uygun stratejileri önerir.</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Risk Derecesi Değerlendirmesi</h4>
              <p className="text-white">Finansal AI asistanınız, kişisel risk profilinize göre yatırım analizleri yapar ve size en uygun planları sunar.</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Gerçek Zamanlı Piyasa Verileri</h4>
              <p className="text-white">DenizYatirim günlük bülten verileri sayesinde her zaman güncel kalın.</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Finansal Analizler</h4>
              <p className="text-white">Geniş veri analizi ile finansal durumunuzu değerlendirin.</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Kişiselleştirilmiş Danışmanlık</h4>
              <p className="text-white">Size özel finansal danışmanlık hizmetleri alın.</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-8 shadow-lg transition transform hover:scale-105 hover:bg-indigo-900">
              <h4 className="text-3xl font-bold mb-2 text-white">Portföy Yönetimi</h4>
              <p className="text-white">Portföyünüzü etkili bir şekilde yönetin ve optimize edin.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto bg-gradient-to-r from-indigo-950 to-indigo-400 shadow-lg py-4">
        <p className="text-center text-white">© Wealthify Finansal Asistan 2024 Tüm hakları saklıdır</p>
      </footer>
    </div>
  );
}

export default HomePage;
