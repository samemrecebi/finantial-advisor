"use client"; // Add this at the top

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use the correct router hook for the latest Next.js version

const ChatPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      text: 'Kendini tanıtır mısın?',
      isUser: true,
    },
    {
      text: 'Ben bir yatırım danışmanıyım ve size finansal konular hakkında bilgi ve tavsiyeler sağlamak için buradayım. Hisse senetleri, döviz kurları ve yatırım stratejileri gibi konularda size güncel ve doğru bilgiler sunarak, yatırım kararlarınızı daha bilinçli bir şekilde almanıza yardımcı olmayı amaçlıyorum. Finansal terimleri ve kavramları anlaşılır bir şekilde açıklayarak, yatırım dünyasında daha rahat hareket etmenizi sağlamaya çalışacağım. Finans dışındaki konular hakkında sorularınız olursa, size yardımcı olamayacağımı belirtmek isterim. Size nasıl yardımcı olabilirim?',
      isUser: false,
    },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
    }
  };

  const redirectToProfile = () => {
    router.push('/profile'); // Adjust this route according to your Next.js setup
  };

  return (
    <div className="flex flex-col h-screen bg-sky-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-sky-200">
        <button className="p-2 bg-blue-800 rounded-md hover:bg-blue-600">
          <Image src="/Vector.svg" alt="Menu" width={24} height={24} />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-black text-xl font-normal font-['Inter']">Kendini tanıtır mısın?</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-blue-800 rounded-md" onClick={redirectToProfile}>
            <Image
              className="w-8 h-8 rounded-full"
              src="/Ellipse 2.svg"
              alt="User"
              width={32}
              height={32}
            />
          </button>
          <div className="p-2 bg-blue-800 rounded-md">
            <Image src="/Share-1--Streamline-Ultimate.png.png" alt="Share" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            {!message.isUser && (
              <Image
                className="w-10 h-10 rounded-full mr-2"
                src="/LOGO 4.png"
                alt="Assistant"
                width={40}
                height={40}
              />
            )}
            <div className={`p-4 bg-sky-200 rounded-lg max-w-md ${message.isUser ? 'ml-2' : 'mr-2'}`}>
              <p className="text-black text-xl font-normal font-['Inter']">{message.text}</p>
            </div>
            {message.isUser && (
              <Image
                className="w-10 h-10 rounded-full ml-2"
                src="/Ellipse 3.svg"
                alt="User"
                width={40}
                height={40}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <button className="p-2 mr-2 bg-blue-800 rounded-md hover:bg-blue-600">
          <Image src="/Attachment-1--Streamline-Ultimate.png.png" alt="Attach" width={24} height={24} />
        </button>
        <input
          type="text"
          placeholder="Mesajınızı buraya giriniz"
          className="flex-1 p-2 border border-blue-800 rounded-lg text-blue-800 text-[32px] font-normal font-['Inter']"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="p-2 ml-2 bg-blue-800 rounded-md hover:bg-blue-600 text-white" onClick={sendMessage}>
          <Image src="/Arrow 1.svg" alt="Send" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
