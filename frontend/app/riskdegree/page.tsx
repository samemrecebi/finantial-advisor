'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { serialize } from 'v8';

const riskdegree: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<number | 0>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMoney, setSelectedMoney] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskPuani, setRiskPuani] = useState<number | 0>(0);
  const [riskGetiriTercihi, setRiskGetiriTercihi] = useState<string | null>(null);
  const [aniDurum, setAniDurum] = useState<string | null>(null);
  const [yatirimHedefi, setYatirimHedefi] = useState<string | null>(null);
  const handleRiskSelection = (risk: number) => {
    setSelectedRisk(risk);
  };

  const handleTimeSelection = (time : string) =>{
    setSelectedTime(time);
  };

  const handleMoneySelection = (money : string) =>{
    setSelectedMoney(money);
  };
  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  const handleRiskGetiriTercihi = (riskGetiriTercihi: string) => {
    setRiskGetiriTercihi(riskGetiriTercihi);
  };
  const handleYatirimHedefi = (yatirimHedefi: string) => {
    setYatirimHedefi(yatirimHedefi);
  };
  const handleAniDurum = (aniDurum: string) => {
    setAniDurum(aniDurum);
  };
  const handleCompleteTest = (type: string, risk: number, time: string, money:string) => {
    let riskHesap=0;

    if (selectedType === 'Genel Yatırımcı') riskHesap=riskHesap;
    else if (selectedType === 'Nitelikli Yatırımcı') riskHesap=riskHesap+1;
    
    riskHesap=riskHesap+selectedRisk;

    if(selectedTime==='birOtuzGun') riskHesap=riskHesap+4;
    else if(selectedTime==='birUcAy') riskHesap=riskHesap+3;
    else if(selectedTime==='ucAltiAy') riskHesap=riskHesap+2;
    else if(selectedTime==='altiAyBirYil') riskHesap=riskHesap+1;
    else if(selectedTime==='birYil') riskHesap=riskHesap;

    if(selectedMoney==='onm') riskHesap=riskHesap+4;
    else if(selectedMoney==='bironm') riskHesap=riskHesap+3;
    else if(selectedMoney==='yuzbirm') riskHesap=riskHesap+2;
    else if(selectedMoney==='onyuz') riskHesap=riskHesap+1;
    else if(selectedMoney==='onbineksi') riskHesap=riskHesap;

    if(yatirimHedefi==='yuksekGetiri') riskHesap=riskHesap+4;
    else if(yatirimHedefi==='emeklilik') riskHesap=riskHesap+3;
    else if(yatirimHedefi==='uzunVadeBuyume') riskHesap=riskHesap+2;
    else if(yatirimHedefi==='duzenliGelir') riskHesap=riskHesap+1;
    else if(yatirimHedefi==='sermayeKoruma') riskHesap=riskHesap;

    if(riskGetiriTercihi==='anaParaTamamenKayip') riskHesap=riskHesap+4;
    else if(riskGetiriTercihi==='anaParaKayip') riskHesap=riskHesap+3;
    else if(riskGetiriTercihi==='anaParaMiktarKayip') riskHesap=riskHesap+2;
    else if(riskGetiriTercihi==='anaParaAzKayip') riskHesap=riskHesap+1;
    else if(riskGetiriTercihi==='anaParaKoru') riskHesap=riskHesap;

    if(aniDurum==='hareketsiz') riskHesap=riskHesap+4;
    else if(aniDurum==='fayda') riskHesap=riskHesap+3;
    else if(aniDurum==='sabir') riskHesap=riskHesap+2;
    else if(aniDurum==='durumDegerlendirmesi') riskHesap=riskHesap+1;
    else if(aniDurum==='panik') riskHesap=riskHesap;

    setRiskPuani(riskHesap);

  };

  // Define colors and sizes for different risk levels
  const riskColors: { [key: number]: string } = {
    1: 'bg-[#008000]',
    2: 'bg-[#9ACD32]',
    3: 'bg-[#FFD700]',
    4: 'bg-[#FF8C00]',
    5: 'bg-[#B22222]',
    6: 'bg-[#FF6347]',
    7: 'bg-[#2F4F4F]'
  };

  const riskSizes: { [key: number]: string } = {
    1: 'h-50',
    2: 'h-75',
    3: 'h-100',
    4: 'h-125',
    5: 'h-150',
    6: 'h-175',
    7: 'h-200'
  };

  // Define descriptions for different risk levels
  const riskDescriptions: { [key: number]: string } = {
    1: 'Olabildiğince riskten kaçınır, güvenli yatırım araçları ile az ama düzenli bir getiri sağlamayı tercih ederim.',
    2: 'Enflasyonun ile paralel getiri beklemekle beraber paramı korumak isterim, düşük riskli ürünlere yatırım yapabilirim.',
    3: 'Enflasyonun üzerinde getiri beklentisiyle, düşük riskli ürünlere yatırım yapabilirim.',
    4: 'Genel olarak orta riskli ürünleri tercih etmekle beraber, uzun vadede getirimi artırmak için riskli ürünlere makul ölçüde yatırım yapabilirim.',
    5: 'Orta - yüksek riskli ürünleri tercih ederim ve orta vadede getiri sağlamak için makul riskteki ürünlere yatırım yapabilirim',
    6: 'Yüksek getiri beklentisiyle, her türlü riskteki ürüne yatırım yapabilirim.',
    7: 'Çok yüksek getiri isterim ve çok yüksek riskli ürünlere yatırım yapabilirim.'
  };

  return (
    <div className="bg-gradient-to-r from-[#F0F5FF] to-[#D6E4FF] min-h-screen flex flex-col items-center justify-center py-16 relative">
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <ellipse cx="720" cy="160" rx="700" ry="600" stroke="#ADC6FF" strokeWidth="4" fill="none" />
      </svg>
      <div className="relative z-10">

{currentPage === -1 && (
            <div className="flex flex-col items-center p-8 space-y-6 bg-gradient-to-r from-[#D6E4FF] to-[#2F54EB] rounded-xl shadow-xl w-[700px]">
            <h1 className="text-4xl font-extrabold text-center text-white mb-6">RİSK ANALİZİ</h1>
            <h1 className="text-xl font-bold text-center">Yatırım dünyasında doğru adımları atmak için risk seviyenizi analiz edin ve size özel stratejilerle öne çıkın!</h1>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setCurrentPage(0)}
                    className="bg-[#061178] text-white px-6 py-3 rounded shadow-lg hover:bg-[#1d39c4] transition duration-300 ease-in-out">
                    TESTİ ÇÖZ
                </button>
            </div>
        </div>
)}

{currentPage === 0 && (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-[#061178] mb-8">Yatırımcı Tipi</h1>
    <div className="flex justify-center space-x-12">
      <div
        onClick={() => setSelectedType('Genel Yatırımcı')}
        className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
          selectedType === 'Genel Yatırımcı' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <div className="flex justify-center mb-4">
          <img src="/genelYatirimci.png" alt="Genel Yatırımcı" />
        </div>
        <p className={`text-center ${selectedType === 'Genel Yatırımcı' ? 'text-[#061178]' : 'text-black'}`}>
          Genel Yatırımcı
        </p>
      </div>
      <div
        onClick={() => setSelectedType('Nitelikli Yatırımcı')}
        className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
          selectedType === 'Nitelikli Yatırımcı' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <div className="flex justify-center mb-4">
          <img src="/nitelik.png" alt="Nitelikli Yatırımcı" />
        </div>
        <p className={`text-center ${selectedType === 'Nitelikli Yatırımcı' ? 'text-[#061178]' : 'text-black'}`}>
          Nitelikli Yatırımcı
        </p>
      </div>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => setCurrentPage(1)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded transition-opacity duration-300 ${!selectedType ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!selectedType}
      >
        DEVAM
      </button>
    </div>
  </div>
)}



{
  currentPage === 1 && (
    <div className="relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#061178]">Yatırım Hedefiniz</h1>
      </div>
      <div className="flex flex-col items-center mb-8">
        {/* Top row */}
        <div className="flex justify-center space-x-8 mb-8">
          <div
            onClick={() => setYatirimHedefi('sermayeKoruma')}
            className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
              yatirimHedefi === 'sermayeKoruma' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <img src="/sermayekoruma.png" alt="Sermaye Koruma" className="mb-4" />
            <p className={`text-center ${yatirimHedefi === 'sermayeKoruma' ? 'text-[#061178]' : 'text-black'}`}>
              Sermayemi korumak
            </p>
          </div>
          <div
            onClick={() => setYatirimHedefi('duzenliGelir')}
            className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
              yatirimHedefi === 'duzenliGelir' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <img src="/duzenligelir.png" alt="Düzenli Gelir" className="mb-4" />
            <p className={`text-center ${yatirimHedefi === 'duzenliGelir' ? 'text-[#061178]' : 'text-black'}`}>
              Düzenli gelir elde etmek
            </p>
          </div>
          <div
            onClick={() => setYatirimHedefi('uzunVadeBuyume')}
            className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
              yatirimHedefi === 'uzunVadeBuyume' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <img src="/uzunvadebuyume.png" alt="Uzun Vadede Büyüme" className="mb-4" />
            <p className={`text-center ${yatirimHedefi === 'uzunVadeBuyume' ? 'text-[#061178]' : 'text-black'}`}>
              Uzun vadede büyüme sağlamak
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-center space-x-8">
          <div
            onClick={() => setYatirimHedefi('emeklilik')}
            className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
              yatirimHedefi === 'emeklilik' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <img src="/emekli.png" alt="Emeklilik Birikimi" className="mb-4" />
            <p className={`text-center ${yatirimHedefi === 'emeklilik' ? 'text-[#061178]' : 'text-black'}`}>
              Emeklilik için birikim yapmak
            </p>
          </div>
          <div
            onClick={() => setYatirimHedefi('yuksekGetiri')}
            className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
              yatirimHedefi === 'yuksekGetiri' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <img src="risklibuyume.png" alt="Riskle Yüksek Getiri" className="mb-4" />
            <p className={`text-center ${yatirimHedefi === 'yuksekGetiri' ? 'text-[#061178]' : 'text-black'}`}>
              Risk alarak yüksek getiri sağlamak
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button onClick={() => setCurrentPage(0)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
        <button
          onClick={() => setCurrentPage(2)}
          className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!yatirimHedefi ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!yatirimHedefi}
        >
          DEVAM
        </button>
      </div>
    </div>
  )
}

{currentPage === 2 && (
  <div className="text-center mb-8">
    <h1 className="text-2xl font-bold text-[#061178] mb-8">
      Tercih Ettiğiniz <span className="text-red-600">Risk Seviyesi</span>
    </h1>
    <div className="flex flex-wrap justify-center mb-8 gap-8">
      {[1, 2, 3, 4, 5, 6, 7].map((risk) => (
        <div
          key={risk}
          onClick={() => handleRiskSelection(risk)}
          className={`flex flex-col items-center cursor-pointer ${
            selectedRisk === risk ? 'border-[#061178]' : 'border-gray-300'
          }`}
        >
          <div
            className={`flex items-center justify-center ${riskColors[risk]} ${selectedRisk === risk ? 'text-white' : 'text-black'}`}
            style={{ height: riskSizes[risk].replace('h-', '') + 'px', width: '80px', marginTop: `${200 - parseInt(riskSizes[risk].replace('h-', ''))}px` }} // Fixed width and dynamic height
          >
            <div
              className={`w-16 rounded-full ${selectedRisk === risk ? 'border-white' : 'border-black'}`}
            >
              {/* Box for the risk level */}
            </div>
          </div>
          <div className={`mt-2 ${selectedRisk === risk ? 'text-[#061178]' : 'text-[#061178]'}`}>
            {risk}
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mb-8">
      <h2 className="text-xl font-bold text-[#061178] mb-4">
        Risk Değeri <span className="text-3xl font-extrabold text-[#061178]">{selectedRisk}</span>
      </h2>
      <p className="text-black">{riskDescriptions[selectedRisk ?? 1]}</p>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button onClick={() => setCurrentPage(1)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
      <button
        onClick={() => setCurrentPage(3)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!selectedRisk ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!selectedRisk}
      >
        DEVAM
      </button>
    </div>
  </div>
)}



{currentPage === 3 && (
  <div className="relative z-10">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-[#061178]">Planladığınız Yatırım Süresi</h1>
    </div>
    <div className="flex flex-col items-center mb-8">
      {/* Top row */}
      <div className="flex justify-center space-x-8 mb-8">
        <div
          onClick={() => setSelectedTime('birOtuzGun')}
          className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
            selectedTime === 'birOtuzGun' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <img src="/birOtuzGun.png" alt="1 - 30 Gün" className="mb-4" />
          <p className={`text-center ${selectedTime === 'birOtuzGun' ? 'text-[#061178]' : 'text-black'}`}>
            1 - 30 Gün
          </p>
        </div>
        <div
          onClick={() => setSelectedTime('birUcAy')}
          className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
            selectedTime === 'birUcAy' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <img src="/birUcAy.png" alt="1 - 3 Ay" className="mb-4" />
          <p className={`text-center ${selectedTime === 'birUcAy' ? 'text-[#061178]' : 'text-black'}`}>
            1 - 3 Ay
          </p>
        </div>
        <div
          onClick={() => setSelectedTime('ucAltiAy')}
          className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
            selectedTime === 'ucAltiAy' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <img src="/ucAltiAy.png" alt="3 - 6 Ay" className="mb-4" />
          <p className={`text-center ${selectedTime === 'ucAltiAy' ? 'text-[#061178]' : 'text-black'}`}>
            3 - 6 Ay
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-center space-x-8">
        <div
          onClick={() => setSelectedTime('altiAyBirYil')}
          className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
            selectedTime === 'altiAyBirYil' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <img src="/altiAyBirYil.png" alt="6 Ay - 1 Yıl" className="mb-4" />
          <p className={`text-center ${selectedTime === 'altiAyBirYil' ? 'text-[#061178]' : 'text-black'}`}>
            6 Ay - 1 Yıl
          </p>
        </div>
        <div
          onClick={() => setSelectedTime('birYil')}
          className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
            selectedTime === 'birYil' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <img src="/birYil.png" alt="1 Yıl ve Daha Fazlası" className="mb-4" />
          <p className={`text-center ${selectedTime === 'birYil' ? 'text-[#061178]' : 'text-black'}`}>
            1 Yıl ve Üzeri
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button onClick={() => setCurrentPage(2)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
      <button
        onClick={() => setCurrentPage(4)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!selectedTime}
      >
        DEVAM
      </button>
    </div>
  </div>
)}

{currentPage === 4 && (
  <div className="relative z-10 w-full flex flex-col items-center">
    <div className="w-full flex items-center justify-between">
      <div className="pl-16">
        <h1 className="text-3xl font-bold text-[#061178] relative" style={{ right: '-5rem', width: 'fit-content', maxWidth: 'calc(100% - 10rem)', whiteSpace: 'normal' }}>
          Planladığınız Yatırım Miktarı
        </h1>
      </div>
      <div className="flex flex-col items-end mb-8 space-y-4 pr-12" style={{ transform: 'translateX(-5rem)' }}>
        {/* All boxes */}
        <div
          onClick={() => setSelectedMoney('onbineksi')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
            selectedMoney === 'onbineksi' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${selectedMoney === 'onbineksi' ? 'text-[#061178]' : 'text-black'}`}>
            10.000₺'ye kadar
          </p>
        </div>
        <div
          onClick={() => setSelectedMoney('onyuz')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
            selectedMoney === 'onyuz' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${selectedMoney === 'onyuz' ? 'text-[#061178]' : 'text-black'}`}>
            10.000₺ - 100.000₺
          </p>
        </div>
        <div
          onClick={() => setSelectedMoney('yuzbirm')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
            selectedMoney === 'yuzbirm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${selectedMoney === 'yuzbirm' ? 'text-[#061178]' : 'text-black'}`}>
            100.000₺ - 1.000.000₺
          </p>
        </div>
        <div
          onClick={() => setSelectedMoney('bironm')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
            selectedMoney === 'bironm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${selectedMoney === 'bironm' ? 'text-[#061178]' : 'text-black'}`}>
            1.000.000₺ - 10.000.000₺
          </p>
        </div>
        <div
          onClick={() => setSelectedMoney('onm')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
            selectedMoney === 'onm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${selectedMoney === 'onm' ? 'text-[#061178]' : 'text-black'}`}>
            10.000.000₺ ve üzeri
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button onClick={() => setCurrentPage(3)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
      <button
        onClick={() => setCurrentPage(5)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!selectedMoney ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!selectedMoney}
      >
        DEVAM
      </button>
    </div>
  </div>
)}


{currentPage === 5 && (
  <div className="relative z-10 w-full flex flex-col items-center overflow-hidden">
    {/* Centered Header */}
    <div className="w-full flex justify-center mt-4">
    <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Risk-Getiri Tercihiniz</h1>

    </div>
    <div className="w-full flex flex-col items-center mt-8 space-y-4">
      {/* All boxes */}
      <div
        onClick={() => setRiskGetiriTercihi('anaParaKoru')}
        className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
          riskGetiriTercihi === 'anaParaKoru' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <p className={`text-center ${riskGetiriTercihi === 'anaParaKoru' ? 'text-[#061178]' : 'text-black'}`}>
          Anaparam aynen korunsun.
        </p>
      </div>
      <div
        onClick={() => setRiskGetiriTercihi('anaParaAzKayip')}
        className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
          riskGetiriTercihi === 'anaParaAzKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <p className={`text-center ${riskGetiriTercihi === 'anaParaAzKayip' ? 'text-[#061178]' : 'text-black'}`}>
      
          Anaparadan çok az bir miktar kaybetmeyi göze alabilirim.
        </p>
      </div>
      <div
        onClick={() => setRiskGetiriTercihi('anaParaMiktarKayip')}
        className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
          riskGetiriTercihi === 'anaParaMiktarKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <p className={`text-center ${riskGetiriTercihi === 'anaParaMiktarKayip' ? 'text-[#061178]' : 'text-black'}`}>
          Anaparadan bir miktar kaybetmeyi
          göze alabilirim.
        </p>
      </div>
      <div
        onClick={() => setRiskGetiriTercihi('anaParaKayip')}
        className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
          riskGetiriTercihi === 'anaParaKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <p className={`text-center ${riskGetiriTercihi === 'anaParaKayip' ? 'text-[#061178]' : 'text-black'}`}>
          Anaparadan kaybetmeyi
          göze alabilirim.
        </p>
      </div>
      <div
        onClick={() => setRiskGetiriTercihi('anaParaTamamenKayip')}
        className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
          riskGetiriTercihi === 'anaParaTamamenKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
        }`}
      >
        <p className={`text-center ${riskGetiriTercihi === 'anaParaTamamenKayip' ? 'text-[#061178]' : 'text-black'}`}>
          Anaparayı
          tamamen kaybetmeyi göze alabilirim.
        </p>
      </div>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button onClick={() => setCurrentPage(4)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
      <button
        onClick={() => setCurrentPage(6)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!riskGetiriTercihi ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!riskGetiriTercihi}
      >
        DEVAM
      </button>
    </div>
  </div>
)}

{currentPage === 6 && (
  <div className="relative z-10 w-full flex flex-col items-center">
    <div className="w-full flex items-center justify-between">
      <div className="pl-16">
        <h1 className="text-3xl font-bold text-[#061178] relative" style={{ right: '-8rem', width: 'fit-content', maxWidth: 'calc(100% - 10rem)', whiteSpace: 'normal' }}>
          Beklenmedik Bir Piyasa Dalgalanmasında Tepkiniz
        </h1>
      </div>
      <div className="flex flex-col items-end mb-8 space-y-4 pr-12" style={{ transform: 'translateX(-10rem)' }}>
        <div className="grid grid-cols-1 gap-4">
          <div
            onClick={() => setAniDurum('panik')}
            className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
              aniDurum === 'panik' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <p className={`text-center ${aniDurum === 'panik' ? 'text-[#061178]' : 'text-black'}`}>
              Panikle satış yaparım.
            </p>
          </div>
          <div
            onClick={() => setAniDurum('durumDegerlendirmesi')}
            className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
              aniDurum === 'durumDegerlendirmesi' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <p className={`text-center ${aniDurum === 'durumDegerlendirmesi' ? 'text-[#061178]' : 'text-black'}`}>
              Durumu değerlendirir ve gerekirse aksiyon alırım.
            </p>
          </div>
          <div
            onClick={() => setAniDurum('sabir')}
            className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
              aniDurum === 'sabir' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <p className={`text-center ${aniDurum === 'sabir' ? 'text-[#061178]' : 'text-black'}`}>
              Sabırlı olur ve piyasaların toparlanmasını beklerim.
            </p>
          </div>
          <div
            onClick={() => setAniDurum('fayda')}
            className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
              aniDurum === 'fayda' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <p className={`text-center ${aniDurum === 'fayda' ? 'text-[#061178]' : 'text-black'}`}>
              Dalgalanmalardan faydalanmaya çalışırım.
            </p>
          </div>
          <div
            onClick={() => setAniDurum('hareketsiz')}
            className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
              aniDurum === 'hareketsiz' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
            }`}
          >
            <p className={`text-center ${aniDurum === 'hareketsiz' ? 'text-[#061178]' : 'text-black'}`}>
              Hiçbir şey yapmam, yatırımımdan memnunum.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-8 space-x-4">
      <button onClick={() => setCurrentPage(5)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
      <button
        onClick={() => setCurrentPage(7)}
        className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!aniDurum ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!aniDurum}
      >
        DEVAM
      </button>
    </div>
  </div>
)}





{currentPage === 7 && (
  <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 overflow-hidden">
    <div className="w-full max-w-[1000px] p-4 rounded bg-gradient-to-r from-blue-100 to-gray-100 shadow-md box-border overflow-auto">
      <h2 className="font-bold text-lg text-black text-center">YASAL UYARI</h2>
      <p className="text-center text-black mt-2">
        Bu test ve testin sonucunda yer alan yatırım bilgi, yorum ve tavsiyeleri yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı hizmeti, yetkili kuruluşlar tarafından kişilerin risk ve getiri tercihleri dikkate alınarak kişiye özel sunulmaktadır. Burada yer alan yorum ve tavsiyeler ise genel niteliktedir. Bu tavsiyeler mali durumunuz ile risk ve getiri tercihlerinize uygun olmayabilir. Bu nedenle, sadece burada yer alan bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize uygun sonuçlar doğurmayabilir.
      </p>
      <div className="flex items-center justify-center mt-4">
        <input
          type="checkbox"
          id="acceptTerms"
          className="mr-2 text-black"
          checked={termsAccepted}
          onChange={handleCheckboxChange}
          aria-labelledby="acceptTermsLabel"
        />
        <label htmlFor="acceptTerms" className="text-sm text-black" id="acceptTermsLabel">
          Okudum ve kabul ediyorum.
        </label>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={() => setCurrentPage(6)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">GERİ</button>
        <button
          onClick={() => {
            handleCompleteTest(selectedType || '', selectedRisk, selectedTime || '', selectedMoney || '');
            setCurrentPage(8);
          }}
          className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!termsAccepted}
        >
          Testi Tamamla
        </button>
      </div>
    </div>
  </div>
)}



{currentPage === 8 && (
  <div className="box">
  <div className="p-6 space-y-6 bg-gradient-to-r from-blue-200 to-gray-100 rounded-lg shadow-lg">
    <h1 className="text-3xl font-extrabold text-center text-[#061178] mb-4">Size Önerilerimiz</h1>

    {riskPuani <= 5 && (
      <div className="p-4 bg-green-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#064e3b] flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#064e3b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Çok Düşük Riskli Yatırımlar
        </h2>
        <div className="mt-4 space-y-2">
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Repo-Ters Repo
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            BPP
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Risk Değeri 1 Olan Yatırım Fonları
          </div>
        </div>
      </div>
    )}

    {riskPuani > 5 && riskPuani <= 11 && (
      <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#856404] flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#856404]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Düşük Riskli Yatırımlar
        </h2>
        <div className="mt-4 space-y-2">
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Hazine Bonosu
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Devlet Tahvili
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Hazine Kira Sertifikaları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Risk Değeri 2 ve 3 Olan Yatırım Fonları
          </div>
        </div>
      </div>
    )}

    {riskPuani > 11 && riskPuani <= 17 && (
      <div className="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#1e40af] flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#1e40af]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Orta Riskli Yatırımlar
        </h2>
        <div className="mt-4 space-y-2">
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Hisse Senedi Fonları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Borsa Yatırım Fonları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Eurobond
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Dövizli Tahviller
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Özel Sektör Borçlanma Araçları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Kira Sertifikaları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Risk Değeri 4 Olan Yatırım Fonları
          </div>
        </div>
      </div>
    )}

    {riskPuani > 17 && riskPuani<=23 && (
      <div className="p-4 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#b91c1c] flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#b91c1c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Yüksek Riskli Yatırımlar
        </h2>
        <div className="mt-4 space-y-2">
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Türev İşlemler
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Varant
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Yatırım Kuruluşu Sertifikası
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Risk Değeri 5 ve 6 Olan Yatırım Fonları
          </div>
        </div>
      </div>
    )}

    {riskPuani > 23 && (
      <div className="p-4 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#b91c1c] flex items-center">
          <svg className="w-6 h-6 mr-2 text-[#b91c1c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Çok Yüksek Riskli Yatırımlar
        </h2>
        <div className="mt-4 space-y-2">
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Tezgahüstü Türev İşlemler
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Yapılandırılmış Borçlanma Araçları
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Kaldıraçlı Alım Satım İşlemleri - FX
          </div>
          <div className="p-2 bg-white text-black rounded-lg shadow-sm">
            Risk Değeri 7 Olan Yatırım Fonları
          </div>
        </div>
      </div>
    )}
  </div>
        <div className="flex justify-center mt-8 space-x-4">
            <button onClick={() => {
              setCurrentPage(-1);
              setSelectedType('');
              setSelectedRisk(0);
              setSelectedMoney('');
              setSelectedTime('');
              setTermsAccepted(false)
              setRiskPuani(0);
              setYatirimHedefi('');
              setAniDurum('');
              setRiskGetiriTercihi('');

            }} 
              className="bg-[#ADC6FF] text-white px-6 py-2 rounded">TEKRAR ÇÖZ</button>
    <Link href="/chat-screen" passHref>
        <button className="bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded">
            CHAT EKRANINA DÖN
        </button>
    </Link>
            </div>
  </div>
  
)}





      </div>
    </div>
  );
};

export default riskdegree;
