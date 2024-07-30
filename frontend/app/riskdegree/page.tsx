'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const riskdegree: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMoney, setSelectedMoney] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskPuani, setRiskPuani] = useState<number>(0);
  const [riskGetiriTercihi, setRiskGetiriTercihi] = useState<string | null>(null);
  const [aniDurum, setAniDurum] = useState<string | null>(null);
  const [yatirimHedefi, setYatirimHedefi] = useState<string | null>(null);
  const [urunBilgisiA, setUrunBilgisiA] = useState<string | null>(null);
  const [islemSikligiA, setIslemSikligiA] = useState<string | null>(null);
  const [hacimBilgisiA, setHacimBilgisiA] = useState<string | null>(null);
  const [urunBilgisiB, setUrunBilgisiB] = useState<string | null>(null);
  const [islemSikligiB, setIslemSikligiB] = useState<string | null>(null);
  const [hacimBilgisiB, setHacimBilgisiB] = useState<string | null>(null);
  const [urunBilgisiC, setUrunBilgisiC] = useState<string | null>(null);
  const [islemSikligiC, setIslemSikligiC] = useState<string | null>(null);
  const [hacimBilgisiC, setHacimBilgisiC] = useState<string | null>(null);
  const [urunBilgisiD, setUrunBilgisiD] = useState<string | null>(null);
  const [islemSikligiD, setIslemSikligiD] = useState<string | null>(null);
  const [hacimBilgisiD, setHacimBilgisiD] = useState<string | null>(null);
  const [urunBilgisiE, setUrunBilgisiE] = useState<string | null>(null);
  const [islemSikligiE, setIslemSikligiE] = useState<string | null>(null);
  const [hacimBilgisiE, setHacimBilgisiE] = useState<string | null>(null);
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);

  const handleRiskSelection = (risk: number) => {
    setSelectedRisk(risk);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleMoneySelection = (money: string) => {
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

  const handleCompleteTest = (type: string, risk: number, time: string, money: string) => {
    let riskHesap = 0;

    if (selectedType === 'Genel Yatırımcı') riskHesap = riskHesap;
    else if (selectedType === 'Nitelikli Yatırımcı') riskHesap = riskHesap + 1;

    riskHesap = riskHesap + selectedRisk;

    if (selectedTime === 'birOtuzGun') riskHesap = riskHesap + 4;
    else if (selectedTime === 'birUcAy') riskHesap = riskHesap + 3;
    else if (selectedTime === 'ucAltiAy') riskHesap = riskHesap + 2;
    else if (selectedTime === 'altiAyBirYil') riskHesap = riskHesap + 1;
    else if (selectedTime === 'birYil') riskHesap = riskHesap;

    if (selectedMoney === 'onm') riskHesap = riskHesap + 4;
    else if (selectedMoney === 'bironm') riskHesap = riskHesap + 3;
    else if (selectedMoney === 'yuzbirm') riskHesap = riskHesap + 2;
    else if (selectedMoney === 'onyuz') riskHesap = riskHesap + 1;
    else if (selectedMoney === 'onbineksi') riskHesap = riskHesap;

    if (yatirimHedefi === 'yuksekGetiri') riskHesap = riskHesap + 4;
    else if (yatirimHedefi === 'emeklilik') riskHesap = riskHesap + 3;
    else if (yatirimHedefi === 'uzunVadeBuyume') riskHesap = riskHesap + 2;
    else if (yatirimHedefi === 'duzenliGelir') riskHesap = riskHesap + 1;
    else if (yatirimHedefi === 'sermayeKoruma') riskHesap = riskHesap;

    if (riskGetiriTercihi === 'anaParaTamamenKayip') riskHesap = riskHesap + 4;
    else if (riskGetiriTercihi === 'anaParaKayip') riskHesap = riskHesap + 3;
    else if (riskGetiriTercihi === 'anaParaMiktarKayip') riskHesap = riskHesap + 2;
    else if (riskGetiriTercihi === 'anaParaAzKayip') riskHesap = riskHesap + 1;
    else if (riskGetiriTercihi === 'anaParaKoru') riskHesap = riskHesap;

    if (aniDurum === 'hareketsiz') riskHesap = riskHesap + 4;
    else if (aniDurum === 'fayda') riskHesap = riskHesap + 3;
    else if (aniDurum === 'sabir') riskHesap = riskHesap + 2;
    else if (aniDurum === 'durumDegerlendirmesi') riskHesap = riskHesap + 1;
    else if (aniDurum === 'panik') riskHesap = riskHesap;

    const subQuestionsImpact = (productKnowledge: string, frequency: string, volume: string) => {
      let impact = 0;

      if (productKnowledge === 'Ürün Hakkında Bilgim Kısıtlı') impact += 1;
      else if (productKnowledge === 'Ürün Hakkında Yeterince Bilgim Var') impact += 2;

      if (frequency === 'Arasıra (Ayda Birkaç Defa)') impact += 1;
      else if (frequency === 'Sıklıkla (Haftada Birkaç Defa)') impact += 2;

      if (volume === '50.001 - 500.000') impact += 1;
      else if (volume === '500.001 ve üzeri') impact += 2;

      return impact;
    };

    riskHesap += subQuestionsImpact(urunBilgisiA || '', islemSikligiA || '', hacimBilgisiA || '');
    riskHesap += subQuestionsImpact(urunBilgisiB || '', islemSikligiB || '', hacimBilgisiB || '');
    riskHesap += subQuestionsImpact(urunBilgisiC || '', islemSikligiC || '', hacimBilgisiC || '');
    riskHesap += subQuestionsImpact(urunBilgisiD || '', islemSikligiD || '', hacimBilgisiD || '');
    riskHesap += subQuestionsImpact(urunBilgisiE || '', islemSikligiE || '', hacimBilgisiE || '');

    setRiskPuani(riskHesap);
  };

  const renderOptions = (
    urunBilgisi: string | null,
    setUrunBilgisi: React.Dispatch<React.SetStateAction<string | null>>,
    islemSikligi: string | null,
    setIslemSikligi: React.Dispatch<React.SetStateAction<string | null>>,
    hacimBilgisi: string | null,
    setHacimBilgisi: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <div className="w-full flex justify-around">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-[#061178]">Ürün Bilgisi</h3>
        <div
          onClick={() => setUrunBilgisi('Ürün Hakkında Bilgim Yok')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            urunBilgisi === 'Ürün Hakkında Bilgim Yok' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${urunBilgisi === 'Ürün Hakkında Bilgim Yok' ? 'text-[#061178]' : 'text-black'}`}>
            Ürün Hakkında Bilgim Yok
          </p>
        </div>
        <div
          onClick={() => setUrunBilgisi('Ürün Hakkında Bilgim Kısıtlı')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            urunBilgisi === 'Ürün Hakkında Bilgim Kısıtlı' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${urunBilgisi === 'Ürün Hakkında Bilgim Kısıtlı' ? 'text-[#061178]' : 'text-black'}`}>
            Ürün Hakkında Bilgim Kısıtlı
          </p>
        </div>
        <div
          onClick={() => setUrunBilgisi('Ürün Hakkında Yeterince Bilgim Var')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            urunBilgisi === 'Ürün Hakkında Yeterince Bilgim Var' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${urunBilgisi === 'Ürün Hakkında Yeterince Bilgim Var' ? 'text-[#061178]' : 'text-black'}`}>
            Ürün Hakkında Yeterince Bilgim Var
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-[#061178]">İşlem Sıklığı</h3>
        <div
          onClick={() => setIslemSikligi('Nadiren (Yılda Birkaç Defa)')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            islemSikligi === 'Nadiren (Yılda Birkaç Defa)' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${islemSikligi === 'Nadiren (Yılda Birkaç Defa)' ? 'text-[#061178]' : 'text-black'}`}>
            Nadiren (Yılda Birkaç Defa)
          </p>
        </div>
        <div
          onClick={() => setIslemSikligi('Arasıra (Ayda Birkaç Defa)')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            islemSikligi === 'Arasıra (Ayda Birkaç Defa)' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${islemSikligi === 'Arasıra (Ayda Birkaç Defa)' ? 'text-[#061178]' : 'text-black'}`}>
            Arasıra (Ayda Birkaç Defa)
          </p>
        </div>
        <div
          onClick={() => setIslemSikligi('Sıklıkla (Haftada Birkaç Defa)')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            islemSikligi === 'Sıklıkla (Haftada Birkaç Defa)' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${islemSikligi === 'Sıklıkla (Haftada Birkaç Defa)' ? 'text-[#061178]' : 'text-black'}`}>
            Sıklıkla (Haftada Birkaç Defa)
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-[#061178]">Hacim Bilgisi (TL)</h3>
        <div
          onClick={() => setHacimBilgisi('1 - 50.000')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            hacimBilgisi === '1 - 50.000' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${hacimBilgisi === '1 - 50.000' ? 'text-[#061178]' : 'text-black'}`}>
            1 - 50.000
          </p>
        </div>
        <div
          onClick={() => setHacimBilgisi('50.001 - 500.000')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            hacimBilgisi === '50.001 - 500.000' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${hacimBilgisi === '50.001 - 500.000' ? 'text-[#061178]' : 'text-black'}`}>
            50.001 - 500.000
          </p>
        </div>
        <div
          onClick={() => setHacimBilgisi('500.001 ve üzeri')}
          className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-20 flex items-center justify-center transition-colors ${
            hacimBilgisi === '500.001 ve üzeri' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
          }`}
        >
          <p className={`text-center ${hacimBilgisi === '500.001 ve üzeri' ? 'text-[#061178]' : 'text-black'}`}>
            500.001 ve üzeri
          </p>
        </div>
      </div>
    </div>
  );

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

  const riskDescriptions: { [key: number]: string } = {
    1: 'Olabildiğince riskten kaçınır, güvenli yatırım araçları ile az ama düzenli bir getiri sağlamayı tercih ederim.',
    2: 'Enflasyonun ile paralel getiri beklemekle beraber paramı korumak isterim, düşük riskli ürünlere yatırım yapabilirim.',
    3: 'Enflasyonun üzerinde getiri beklentisiyle, düşük riskli ürünlere yatırım yapabilirim.',
    4: 'Genel olarak orta riskli ürünleri tercih etmekle beraber, uzun vadede getirimi artırmak için riskli ürünlere makul ölçüde yatırım yapabilirim.',
    5: 'Orta - yüksek riskli ürünleri tercih ederim ve orta vadede getiri sağlamak için makul riskteki ürünlere yatırım yapabilirim',
    6: 'Yüksek getiri beklentisiyle, her türlü riskteki ürüne yatırım yapabilirim.',
    7: 'Çok yüksek getiri isterim ve çok yüksek riskli ürünlere yatırım yapabilirim.'
  };

  const investmentDescriptions: { [key: string]: string } = {
    "Repo-Ters Repo":
      "Repo ve ters repo işlemleri, genellikle kısa vadeli yatırımlar için kullanılır ve belirli bir getiri garantisi sunar. Repo, yatırımcının elinde bulunan menkul kıymetleri belirli bir süre için satıp, daha sonra aynı menkul kıymetleri geri almayı taahhüt ettiği işlemdir. Ters repo ise tam tersidir. Bu tür işlemler, riskin düşük olduğu ve getirinin genellikle sabit olduğu yatırım araçlarıdır.",
    
    BPP: 
      "Birikimli Primli Poliçeler (BPP), düzenli prim ödemeleri ile uzun vadede birikim yapmayı amaçlayan yatırım araçlarıdır. BPP'ler, sigorta şirketleri tarafından sunulur ve poliçe süresinin sonunda birikimli primler üzerinden kazanç elde edilir. Bu tür yatırımlar, düşük riskli olup, genellikle enflasyon karşısında sermayenin korunmasını sağlar.",
    
    "Risk Değeri 1 Olan Yatırım Fonları":
      "Risk değeri 1 olan yatırım fonları, en düşük risk kategorisinde yer alır ve genellikle devlet tahvili, hazine bonosu gibi güvenli menkul kıymetlere yatırım yaparlar. Bu fonlar, yatırımcıların sermayesini koruma amacı taşır ve düşük getiri beklentisi ile birlikte gelir.",
    
    "Hazine Bonosu":
      "Hazine bonosu, hükümet tarafından çıkarılan ve belirli bir vade sonunda anapara ile birlikte faiz ödemesi yapılan bir borçlanma aracıdır. Hazine bonoları, düşük riskli yatırım araçları olarak kabul edilir ve sabit getiri sağlar.",
    
    "Devlet Tahvili":
      "Devlet tahvilleri, uzun vadeli borçlanma araçlarıdır ve devlet tarafından çıkarılır. Bu tahviller, belirli periyotlarda faiz ödemesi yapar ve vade sonunda anapara geri ödenir. Devlet tahvilleri, güvenli ve düşük riskli yatırımlar arasında yer alır.",
    
    "Hazine Kira Sertifikaları":
      "Hazine kira sertifikaları, devlet tarafından ihraç edilen ve belirli dönemlerde kira getirisi sağlayan yatırım araçlarıdır. Bu sertifikalar, İslami finans prensiplerine uygun olarak yapılandırılmıştır ve düşük riskli yatırım araçları arasında yer alır.",
    
    "Risk Değeri 2 ve 3 Olan Yatırım Fonları":
      "Risk değeri 2 ve 3 olan yatırım fonları, düşük ila orta risk kategorisinde yer alır ve devlet tahvili, hazine bonosu gibi güvenli menkul kıymetlerin yanı sıra, kurumsal tahviller gibi daha yüksek getirili ancak biraz daha riskli araçlara da yatırım yaparlar.",
    
    "Hisse Senedi Fonları":
      "Hisse senedi fonları, yatırımcılardan toplanan paralarla çeşitli hisse senetlerine yatırım yapar. Bu fonlar, yüksek getiri potansiyeline sahip olmakla birlikte, piyasa dalgalanmalarına karşı yüksek risk taşır. Uzun vadeli yatırım yapmayı düşünen ve piyasa risklerini tolere edebilen yatırımcılar için uygundur.",
    
    "Borsa Yatırım Fonları":
      "Borsa yatırım fonları (ETF'ler), belirli bir endeksin performansını izleyen ve borsada işlem gören yatırım araçlarıdır. ETF'ler, hisse senedi gibi alınıp satılabilir ve çeşitli varlık sınıflarına yatırım yaparak çeşitlendirme sağlar. Orta riskli ve likit yatırım araçlarıdır.",
    
    Eurobond:
      "Eurobondlar, uluslararası piyasalarda yabancı para cinsinden ihraç edilen tahvillerdir. Genellikle dolar veya euro cinsinden ihraç edilir ve yüksek getiri potansiyeline sahiptir. Ancak, döviz kuru riski taşıdıkları için orta ila yüksek risk kategorisinde değerlendirilir.",
    
    "Dövizli Tahviller":
      "Dövizli tahviller, yabancı para cinsinden ihraç edilen borçlanma araçlarıdır. Bu tahviller, döviz kuru dalgalanmalarına karşı duyarlıdır ve yüksek getiri potansiyeline sahiptir. Döviz kuru riski nedeniyle risk seviyesi orta ila yüksektir.",
    
    "Özel Sektör Borçlanma Araçları":
      "Özel sektör borçlanma araçları, şirketler tarafından ihraç edilen tahvillerdir. Bu tahviller, devlet tahvillerine kıyasla daha yüksek getiri sağlar ancak şirketin finansal durumu ve piyasa koşullarına bağlı olarak daha yüksek risk taşır.",
    
    "Kira Sertifikaları":
      "Kira sertifikaları, varlık kiralama yoluyla elde edilen gelirleri yatırımcılara dağıtan İslami finans araçlarıdır. Bu sertifikalar, belirli periyotlarda düzenli kira geliri sağlar ve orta riskli yatırım araçları arasında yer alır.",
    
    "Risk Değeri 4 Olan Yatırım Fonları":
      "Risk değeri 4 olan yatırım fonları, orta risk kategorisinde yer alır ve hisse senedi, özel sektör tahvili gibi daha yüksek getirili ve riskli araçlara yatırım yapar. Bu fonlar, uzun vadede yüksek getiri hedefleyen yatırımcılar için uygundur.",
    
    "Türev İşlemler":
      "Türev işlemler, gelecekteki bir varlık veya endeks fiyatı üzerinde anlaşmaya dayanır. Bu işlemler, yüksek getiri potansiyeline sahip olmakla birlikte, yüksek risk taşır ve genellikle spekülatif amaçlarla kullanılır. Türev araçlar arasında opsiyonlar, vadeli işlemler ve swaplar bulunur.",
    
    Varant:
      "Varantlar, belirli bir varlığı belirli bir fiyattan ve belirli bir tarihe kadar satın alma veya satma hakkı veren menkul kıymetlerdir. Varantlar, yüksek getiri potansiyeline sahip olmakla birlikte, genellikle yüksek riskli yatırım araçlarıdır ve deneyimli yatırımcılar tarafından tercih edilir.",
    
    "Yatırım Kuruluşu Sertifikası":
      "Yatırım kuruluşu sertifikaları, yatırım bankaları veya aracı kurumlar tarafından ihraç edilen menkul kıymetlerdir. Bu sertifikalar, belirli bir varlık veya varlık grubuna dayalı olarak gelir sağlar ve yüksek riskli yatırım araçları arasında yer alır.",
    
    "Risk Değeri 5 ve 6 Olan Yatırım Fonları":
      "Risk değeri 5 ve 6 olan yatırım fonları, yüksek risk kategorisinde yer alır ve türev işlemler, yüksek getirili hisse senetleri gibi riskli varlıklara yatırım yapar. Bu fonlar, yüksek getiri hedefleyen ancak yüksek risk toleransı olan yatırımcılar için uygundur.",
    
    "Tezgahüstü Türev İşlemler":
      "Tezgahüstü (OTC) türev işlemler, organize piyasalarda işlem görmeyen ve genellikle iki taraf arasında yapılan özel anlaşmalardır. Bu işlemler, yüksek getiri potansiyeline sahip olmakla birlikte, yüksek risk ve likidite riski taşır.",
    
    "Yapılandırılmış Borçlanma Araçları":
      "Yapılandırılmış borçlanma araçları, çeşitli finansal varlıkların bir araya getirilerek oluşturulduğu karmaşık borçlanma araçlarıdır. Bu araçlar, genellikle yüksek getiri potansiyeline sahiptir ancak karmaşık yapısı ve yüksek riskleri nedeniyle deneyimli yatırımcılar tarafından tercih edilir.",
    
    "Kaldıraçlı Alım Satım İşlemleri - FX":
      "Kaldıraçlı alım satım işlemleri (forex), küçük bir sermaye ile büyük pozisyonlar alınmasına imkan tanır. Forex işlemleri, yüksek getiri potansiyeline sahip olmakla birlikte, yüksek risk taşır ve genellikle kısa vadeli spekülatif amaçlarla kullanılır.",
    
    "Risk Değeri 7 Olan Yatırım Fonları":
      "Risk değeri 7 olan yatırım fonları, en yüksek risk kategorisinde yer alır ve türev işlemler, kaldıraçlı işlemler gibi çok yüksek riskli varlıklara yatırım yapar. Bu fonlar, çok yüksek getiri hedefleyen ve yüksek risk toleransı olan yatırımcılar için uygundur."
  };
  

  const handleInvestmentClick = (investment: string) => {
    setSelectedInvestment(investment);
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
            <h1 className="text-xl font-bold text-center">
              Yatırım dünyasında doğru adımları atmak için risk seviyenizi analiz edin ve size özel stratejilerle öne çıkın!
            </h1>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentPage(0)}
                className="bg-[#061178] text-white px-6 py-3 rounded shadow-lg hover:bg-[#1d39c4] transition duration-300 ease-in-out"
              >
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
                <p className={`text-center ${selectedType === 'Genel Yatırımcı' ? 'text-[#061178]' : 'text-black'}`}>Genel Yatırımcı</p>
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
                <p className={`text-center ${selectedType === 'Nitelikli Yatırımcı' ? 'text-[#061178]' : 'text-black'}`}>Nitelikli Yatırımcı</p>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentPage(1)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded transition-opacity duration-300 ${
                  !selectedType ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!selectedType}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 1 && (
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#061178]">Yatırım Hedefiniz</h1>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="flex justify-center space-x-8 mb-8">
                <div
                  onClick={() => setYatirimHedefi('sermayeKoruma')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    yatirimHedefi === 'sermayeKoruma' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/sermayekoruma.png" alt="Sermaye Koruma" className="mb-4" />
                  <p className={`text-center ${yatirimHedefi === 'sermayeKoruma' ? 'text-[#061178]' : 'text-black'}`}>Sermayemi korumak</p>
                </div>
                <div
                  onClick={() => setYatirimHedefi('duzenliGelir')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    yatirimHedefi === 'duzenliGelir' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/duzenligelir.png" alt="Düzenli Gelir" className="mb-4" />
                  <p className={`text-center ${yatirimHedefi === 'duzenliGelir' ? 'text-[#061178]' : 'text-black'}`}>Düzenli gelir elde etmek</p>
                </div>
                <div
                  onClick={() => setYatirimHedefi('uzunVadeBuyume')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    yatirimHedefi === 'uzunVadeBuyume' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/uzunvadebuyume.png" alt="Uzun Vadede Büyüme" className="mb-4" />
                  <p className={`text-center ${yatirimHedefi === 'uzunVadeBuyume' ? 'text-[#061178]' : 'text-black'}`}>Uzun vadede büyüme sağlamak</p>
                </div>
              </div>

              <div className="flex justify-center space-x-8">
                <div
                  onClick={() => setYatirimHedefi('emeklilik')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    yatirimHedefi === 'emeklilik' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/emekli.png" alt="Emeklilik Birikimi" className="mb-4" />
                  <p className={`text-center ${yatirimHedefi === 'emeklilik' ? 'text-[#061178]' : 'text-black'}`}>Emeklilik için birikim yapmak</p>
                </div>
                <div
                  onClick={() => setYatirimHedefi('yuksekGetiri')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    yatirimHedefi === 'yuksekGetiri' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="risklibuyume.png" alt="Riskle Yüksek Getiri" className="mb-4" />
                  <p className={`text-center ${yatirimHedefi === 'yuksekGetiri' ? 'text-[#061178]' : 'text-black'}`}>Risk alarak yüksek getiri sağlamak</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(0)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!yatirimHedefi ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!yatirimHedefi}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

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
                  className={`flex flex-col items-center cursor-pointer ${selectedRisk === risk ? 'border-[#061178]' : 'border-gray-300'}`}
                >
                  <div
                    className={`flex items-center justify-center ${riskColors[risk]} ${selectedRisk === risk ? 'text-white' : 'text-black'}`}
                    style={{ height: riskSizes[risk].replace('h-', '') + 'px', width: '80px', marginTop: `${200 - parseInt(riskSizes[risk].replace('h-', ''))}px` }} // Fixed width and dynamic height
                  >
                    <div className={`w-16 rounded-full ${selectedRisk === risk ? 'border-white' : 'border-black'}`}>{/* Box for the risk level */}</div>
                  </div>
                  <div className={`mt-2 ${selectedRisk === risk ? 'text-[#061178]' : 'text-[#061178]'}`}>{risk}</div>
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
              <button onClick={() => setCurrentPage(1)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
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
              <div className="flex justify-center space-x-8 mb-8">
                <div
                  onClick={() => setSelectedTime('birOtuzGun')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    selectedTime === 'birOtuzGun' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/birOtuzGun.png" alt="1 - 30 Gün" className="mb-4" />
                  <p className={`text-center ${selectedTime === 'birOtuzGun' ? 'text-[#061178]' : 'text-black'}`}>1 - 30 Gün</p>
                </div>
                <div
                  onClick={() => setSelectedTime('birUcAy')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    selectedTime === 'birUcAy' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/birUcAy.png" alt="1 - 3 Ay" className="mb-4" />
                  <p className={`text-center ${selectedTime === 'birUcAy' ? 'text-[#061178]' : 'text-black'}`}>1 - 3 Ay</p>
                </div>
                <div
                  onClick={() => setSelectedTime('ucAltiAy')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    selectedTime === 'ucAltiAy' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/ucAltiAy.png" alt="3 - 6 Ay" className="mb-4" />
                  <p className={`text-center ${selectedTime === 'ucAltiAy' ? 'text-[#061178]' : 'text-black'}`}>3 - 6 Ay</p>
                </div>
              </div>

              <div className="flex justify-center space-x-8">
                <div
                  onClick={() => setSelectedTime('altiAyBirYil')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    selectedTime === 'altiAyBirYil' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/altiAyBirYil.png" alt="6 Ay - 1 Yıl" className="mb-4" />
                  <p className={`text-center ${selectedTime === 'altiAyBirYil' ? 'text-[#061178]' : 'text-black'}`}>6 Ay - 1 Yıl</p>
                </div>
                <div
                  onClick={() => setSelectedTime('birYil')}
                  className={`border-4 rounded-lg p-8 cursor-pointer hover:shadow-lg w-60 h-48 flex flex-col items-center justify-center transition-colors ${
                    selectedTime === 'birYil' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <img src="/birYil.png" alt="1 Yıl ve Daha Fazlası" className="mb-4" />
                  <p className={`text-center ${selectedTime === 'birYil' ? 'text-[#061178]' : 'text-black'}`}>1 Yıl ve Üzeri</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(2)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
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
                <h1
                  className="text-3xl font-bold text-[#061178] relative"
                  style={{ right: '-5rem', width: 'fit-content', maxWidth: 'calc(100% - 10rem)', whiteSpace: 'normal' }}
                >
                  Planladığınız Yatırım Miktarı
                </h1>
              </div>
              <div className="flex flex-col items-end mb-8 space-y-4 pr-12" style={{ transform: 'translateX(-5rem)' }}>
                <div
                  onClick={() => setSelectedMoney('onbineksi')}
                  className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
                    selectedMoney === 'onbineksi' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <p className={`text-center ${selectedMoney === 'onbineksi' ? 'text-[#061178]' : 'text-black'}`}>10.000₺'ye kadar</p>
                </div>
                <div
                  onClick={() => setSelectedMoney('onyuz')}
                  className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
                    selectedMoney === 'onyuz' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <p className={`text-center ${selectedMoney === 'onyuz' ? 'text-[#061178]' : 'text-black'}`}>10.000₺ - 100.000₺</p>
                </div>
                <div
                  onClick={() => setSelectedMoney('yuzbirm')}
                  className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
                    selectedMoney === 'yuzbirm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <p className={`text-center ${selectedMoney === 'yuzbirm' ? 'text-[#061178]' : 'text-black'}`}>100.000₺ - 1.000.000₺</p>
                </div>
                <div
                  onClick={() => setSelectedMoney('bironm')}
                  className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
                    selectedMoney === 'bironm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <p className={`text-center ${selectedMoney === 'bironm' ? 'text-[#061178]' : 'text-black'}`}>1.000.000₺ - 10.000.000₺</p>
                </div>
                <div
                  onClick={() => setSelectedMoney('onm')}
                  className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-80 h-16 flex items-center justify-center transition-colors ${
                    selectedMoney === 'onm' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                  }`}
                >
                  <p className={`text-center ${selectedMoney === 'onm' ? 'text-[#061178]' : 'text-black'}`}>10.000.000₺ ve üzeri</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(3)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
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
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Risk-Getiri Tercihiniz</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <div
                onClick={() => setRiskGetiriTercihi('anaParaKoru')}
                className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
                  riskGetiriTercihi === 'anaParaKoru' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                }`}
              >
                <p className={`text-center ${riskGetiriTercihi === 'anaParaKoru' ? 'text-[#061178]' : 'text-black'}`}>Anaparam aynen korunsun.</p>
              </div>
              <div
                onClick={() => setRiskGetiriTercihi('anaParaAzKayip')}
                className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
                  riskGetiriTercihi === 'anaParaAzKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                }`}
              >
                <p className={`text-center ${riskGetiriTercihi === 'anaParaAzKayip' ? 'text-[#061178]' : 'text-black'}`}>Anaparadan çok az bir miktar kaybetmeyi göze alabilirim.</p>
              </div>
              <div
                onClick={() => setRiskGetiriTercihi('anaParaMiktarKayip')}
                className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
                  riskGetiriTercihi === 'anaParaMiktarKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                }`}
              >
                <p className={`text-center ${riskGetiriTercihi === 'anaParaMiktarKayip' ? 'text-[#061178]' : 'text-black'}`}>Anaparadan bir miktar kaybetmeyi göze alabilirim.</p>
              </div>
              <div
                onClick={() => setRiskGetiriTercihi('anaParaKayip')}
                className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
                  riskGetiriTercihi === 'anaParaKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                }`}
              >
                <p className={`text-center ${riskGetiriTercihi === 'anaParaKayip' ? 'text-[#061178]' : 'text-black'}`}>Anaparadan kaybetmeyi göze alabilirim.</p>
              </div>
              <div
                onClick={() => setRiskGetiriTercihi('anaParaTamamenKayip')}
                className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[30rem] h-50 flex items-center justify-center transition-colors ${
                  riskGetiriTercihi === 'anaParaTamamenKayip' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                }`}
              >
                <p className={`text-center ${riskGetiriTercihi === 'anaParaTamamenKayip' ? 'text-[#061178]' : 'text-black'}`}>Anaparayı tamamen kaybetmeyi göze alabilirim.</p>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(4)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
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
                <h1
                  className="text-3xl font-bold text-[#061178] relative"
                  style={{ right: '-8rem', width: 'fit-content', maxWidth: 'calc(100% - 10rem)', whiteSpace: 'normal' }}
                >
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
                    <p className={`text-center ${aniDurum === 'panik' ? 'text-[#061178]' : 'text-black'}`}>Panikle satış yaparım.</p>
                  </div>
                  <div
                    onClick={() => setAniDurum('durumDegerlendirmesi')}
                    className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
                      aniDurum === 'durumDegerlendirmesi' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                    }`}
                  >
                    <p className={`text-center ${aniDurum === 'durumDegerlendirmesi' ? 'text-[#061178]' : 'text-black'}`}>Durumu değerlendirir ve gerekirse aksiyon alırım.</p>
                  </div>
                  <div
                    onClick={() => setAniDurum('sabir')}
                    className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
                      aniDurum === 'sabir' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                    }`}
                  >
                    <p className={`text-center ${aniDurum === 'sabir' ? 'text-[#061178]' : 'text-black'}`}>Sabırlı olur ve piyasaların toparlanmasını beklerim.</p>
                  </div>
                  <div
                    onClick={() => setAniDurum('fayda')}
                    className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
                      aniDurum === 'fayda' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                    }`}
                  >
                    <p className={`text-center ${aniDurum === 'fayda' ? 'text-[#061178]' : 'text-black'}`}>Dalgalanmalardan faydalanmaya çalışırım.</p>
                  </div>
                  <div
                    onClick={() => setAniDurum('hareketsiz')}
                    className={`border-4 rounded p-4 cursor-pointer hover:shadow-lg w-[35rem] h-16 flex items-center justify-center transition-colors ${
                      aniDurum === 'hareketsiz' ? 'border-[#061178] bg-[#E3E9FF]' : 'border-[#ADC6FF]'
                    }`}
                  >
                    <p className={`text-center ${aniDurum === 'hareketsiz' ? 'text-[#061178]' : 'text-black'}`}>Hiçbir şey yapmam, yatırımımdan memnunum.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(5)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
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
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Aşağıdaki yatırım araçlarını değerlendirmek için bilginizi, işlem sıklığınızı ve hacminizi belirtin.</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#061178]">Çok Düşük Riskli (Repo-Ters Repo, BPP, Yatırımcı bilgi formunda risk değeri 1 olan yatırım fonları vb.)</h2>
              {renderOptions(urunBilgisiA, setUrunBilgisiA, islemSikligiA, setIslemSikligiA, hacimBilgisiA, setHacimBilgisiA)}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(6)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(8)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!urunBilgisiA || !islemSikligiA || !hacimBilgisiA ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!urunBilgisiA || !islemSikligiA || !hacimBilgisiA}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 8 && (
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Aşağıdaki yatırım araçlarını değerlendirmek için bilginizi, işlem sıklığınızı ve hacminizi belirtin.</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#061178]">Düşük Riskli (Devlet tahvili, hazine bonosu, risk değeri 2 olan yatırım fonları vb.)</h2>
              {renderOptions(urunBilgisiB, setUrunBilgisiB, islemSikligiB, setIslemSikligiB, hacimBilgisiB, setHacimBilgisiB)}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(7)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(9)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!urunBilgisiB || !islemSikligiB || !hacimBilgisiB ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!urunBilgisiB || !islemSikligiB || !hacimBilgisiB}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 9 && (
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Aşağıdaki yatırım araçlarını değerlendirmek için bilginizi, işlem sıklığınızı ve hacminizi belirtin.</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#061178]">Orta Riskli (Hisse senedi, Borsa Yatırım Fonları, Eurobond, Dövizli Tahviller,Yatırımcı bilgi formunda risk değeri 4 olan yatırım fonları vb.)</h2>
              {renderOptions(urunBilgisiC, setUrunBilgisiC, islemSikligiC, setIslemSikligiC, hacimBilgisiC, setHacimBilgisiC)}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(8)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(10)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!urunBilgisiC || !islemSikligiC || !hacimBilgisiC ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!urunBilgisiC || !islemSikligiC || !hacimBilgisiC}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 10 && (
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Aşağıdaki yatırım araçlarını değerlendirmek için bilginizi, işlem sıklığınızı ve hacminizi belirtin.</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#061178]">Yüksek Riskli (Türev İşlemler, Varant,  Yatırımcı bilgi formunda risk değeri 5 ve 6 olan yatırım fonları vb.)</h2>
              {renderOptions(urunBilgisiD, setUrunBilgisiD, islemSikligiD, setIslemSikligiD, hacimBilgisiD, setHacimBilgisiD)}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(9)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(11)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!urunBilgisiD || !islemSikligiD || !hacimBilgisiD ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!urunBilgisiD || !islemSikligiD || !hacimBilgisiD}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 11 && (
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-bold text-[#061178] mt-[-1rem]">Aşağıdaki yatırım araçlarını değerlendirmek için bilginizi, işlem sıklığınızı ve hacminizi belirtin.</h1>
            </div>
            <div className="w-full flex flex-col items-center mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#061178]">Çok Yüksek Riskli (Tezgahüstü Türev İşlemler, Kaldıraçlı İşlemler , Yatırımcı bilgi formunda risk değeri 7 olan yatırım fonları vb.)</h2>
              {renderOptions(urunBilgisiE, setUrunBilgisiE, islemSikligiE, setIslemSikligiE, hacimBilgisiE, setHacimBilgisiE)}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button onClick={() => setCurrentPage(10)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                GERİ
              </button>
              <button
                onClick={() => setCurrentPage(12)}
                className={`bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded ${!urunBilgisiE || !islemSikligiE || !hacimBilgisiE ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!urunBilgisiE || !islemSikligiE || !hacimBilgisiE}
              >
                DEVAM
              </button>
            </div>
          </div>
        )}

        {currentPage === 12 && (
          <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 overflow-hidden">
            <div className="w-full max-w-[1000px] p-4 rounded bg-gradient-to-r from-blue-100 to-gray-100 shadow-md box-border overflow-auto">
              <h2 className="font-bold text-lg text-black text-center">YASAL UYARI</h2>
              <p className="text-center text-black mt-2">
                Bu test ve testin sonucunda yer alan yatırım bilgi, yorum ve tavsiyeleri yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı hizmeti, yetkili kuruluşlar tarafından
                kişilerin risk ve getiri tercihleri dikkate alınarak kişiye özel sunulmaktadır. Burada yer alan yorum ve tavsiyeler ise genel niteliktedir. Bu tavsiyeler mali durumunuz ile risk ve
                getiri tercihlerinize uygun olmayabilir. Bu nedenle, sadece burada yer alan bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize uygun sonuçlar doğurmayabilir.
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
                <button onClick={() => setCurrentPage(11)} className="bg-[#ADC6FF] text-white px-6 py-2 rounded">
                  GERİ
                </button>
                <button
                  onClick={() => {
                    handleCompleteTest(selectedType || '', selectedRisk, selectedTime || '', selectedMoney || '');
                    setCurrentPage(13);
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

        {currentPage === 13 && (
          <div className="box">
            <div className="p-6 space-y-6 bg-gradient-to-r from-blue-200 to-gray-100 rounded-lg shadow-lg">
              <h1 className="text-3xl font-extrabold text-center text-[#061178] mb-4">Size Önerilerimiz</h1>

              {riskPuani <= 12 && (
                <div className="p-4 bg-green-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#064e3b] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#064e3b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Çok Düşük Riskli Yatırımlar
                  </h2>
                  <div className="mt-4 space-y-2">
                    <div
                      className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer"
                      onClick={() => handleInvestmentClick('Repo-Ters Repo')}
                    >
                      Repo-Ters Repo
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('BPP')}>
                      BPP
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Risk Değeri 1 Olan Yatırım Fonları')}>
                      Risk Değeri 1 Olan Yatırım Fonları
                    </div>
                  </div>
                </div>
              )}

              {riskPuani > 12 && riskPuani <= 23 && (
                <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#856404] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#856404]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Düşük Riskli Yatırımlar
                  </h2>
                  <div className="mt-4 space-y-2">
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Hazine Bonosu')}>
                      Hazine Bonosu
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Devlet Tahvili')}>
                      Devlet Tahvili
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Hazine Kira Sertifikaları')}>
                      Hazine Kira Sertifikaları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Risk Değeri 2 ve 3 Olan Yatırım Fonları')}>
                      Risk Değeri 2 ve 3 Olan Yatırım Fonları
                    </div>
                  </div>
                </div>
              )}

              {riskPuani > 23 && riskPuani <= 35 && (
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#1e40af] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#1e40af]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Orta Riskli Yatırımlar
                  </h2>
                  <div className="mt-4 space-y-2">
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Hisse Senedi Fonları')}>
                      Hisse Senedi Fonları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Borsa Yatırım Fonları')}>
                      Borsa Yatırım Fonları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Eurobond')}>
                      Eurobond
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Dövizli Tahviller')}>
                      Dövizli Tahviller
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Özel Sektör Borçlanma Araçları')}>
                      Özel Sektör Borçlanma Araçları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Kira Sertifikaları')}>
                      Kira Sertifikaları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Risk Değeri 4 Olan Yatırım Fonları')}>
                      Risk Değeri 4 Olan Yatırım Fonları
                    </div>
                  </div>
                </div>
              )}

              {riskPuani > 35 && riskPuani <= 47 && (
                <div className="p-4 bg-red-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#b91c1c] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#b91c1c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Yüksek Riskli Yatırımlar
                  </h2>
                  <div className="mt-4 space-y-2">
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Türev İşlemler')}>
                      Türev İşlemler
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Varant')}>
                      Varant
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Yatırım Kuruluşu Sertifikası')}>
                      Yatırım Kuruluşu Sertifikası
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Risk Değeri 5 ve 6 Olan Yatırım Fonları')}>
                      Risk Değeri 5 ve 6 Olan Yatırım Fonları
                    </div>
                  </div>
                </div>
              )}

              {riskPuani > 47 && (
                <div className="p-4 bg-red-100 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#b91c1c] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#b91c1c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Çok Yüksek Riskli Yatırımlar
                  </h2>
                  <div className="mt-4 space-y-2">
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Tezgahüstü Türev İşlemler')}>
                      Tezgahüstü Türev İşlemler
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Yapılandırılmış Borçlanma Araçları')}>
                      Yapılandırılmış Borçlanma Araçları
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Kaldıraçlı Alım Satım İşlemleri - FX')}>
                      Kaldıraçlı Alım Satım İşlemleri - FX
                    </div>
                    <div className="p-2 bg-white text-black rounded-lg shadow-sm cursor-pointer" onClick={() => handleInvestmentClick('Risk Değeri 7 Olan Yatırım Fonları')}>
                      Risk Değeri 7 Olan Yatırım Fonları
                    </div>
                  </div>
                </div>
              )}

              {selectedInvestment && (
                <div className="p-4 bg-white rounded-lg shadow-md mt-6">
                  <h2 className="text-xl font-semibold text-[#061178]">{selectedInvestment}</h2>
                  <p className="mt-2 text-black">{investmentDescriptions[selectedInvestment]}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  setCurrentPage(-1);
                  setSelectedType(null);
                  setSelectedRisk(0);
                  setSelectedMoney(null);
                  setSelectedTime(null);
                  setTermsAccepted(false);
                  setRiskPuani(0);
                  setYatirimHedefi(null);
                  setAniDurum(null);
                  setRiskGetiriTercihi(null);
                  setUrunBilgisiA(null);
                  setIslemSikligiA(null);
                  setHacimBilgisiA(null);
                  setUrunBilgisiB(null);
                  setIslemSikligiB(null);
                  setHacimBilgisiB(null);
                  setUrunBilgisiC(null);
                  setIslemSikligiC(null);
                  setHacimBilgisiC(null);
                  setUrunBilgisiD(null);
                  setIslemSikligiD(null);
                  setHacimBilgisiD(null);
                  setUrunBilgisiE(null);
                  setIslemSikligiE(null);
                  setHacimBilgisiE(null);
                  setSelectedInvestment(null);
                }}
                className="bg-[#ADC6FF] text-white px-6 py-2 rounded"
              >
                TEKRAR ÇÖZ
              </button>
              <Link href="/chat-screen" passHref>
                <button className="bg-gradient-to-r from-[#061178] to-[#1D39C4] text-white px-6 py-2 rounded">CHAT EKRANINA DÖN</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default riskdegree;
