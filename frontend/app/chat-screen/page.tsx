'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faBars,
  faUser,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Drawer } from 'flowbite-react';

function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<
  { text: string; isUser: boolean }[]
  >([]);
  const [input, setInput] = useState('');
  const sendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
      // Send the message to the backend API
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Received response:', data);
          const botMessage = data.choices[0].message;
          setMessages([...messages, userMessage, { text: botMessage.content, isUser: false }]);
        } else {
          console.error('Failed to get a response from the backend');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  const redirectToProfile = () => {
    router.push('/profile'); // Adjust this route according to your Next.js setup
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex flex-col h-screen bg-blue-100 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button className="bg-blue-900" onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 bg-blue-900 rounded-md"
            onClick={redirectToProfile}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
      <Drawer className="bg-blue-600" open={isOpen} onClose={handleClose}>
        <Drawer.Header className="text-blue-100" title="Konuşmalar" />
        <Drawer.Items>
          <div className="flex items-center justify-between">
            <a
              href="/chat-screen"
              className="inline-flex items-center rounded-lg bg-blue-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Yeni Konusma
            </a>
          </div>
        </Drawer.Items>
      </Drawer>
      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Image src="/logo.png" alt="Fintech" width={300} height={400} />
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <FontAwesomeIcon
                  icon={faRobot}
                  style={{ color: '#1E3A8A' }}
                  className="p-2"
                />
              )}
              <div
                className={`p-2 bg-blue-200 rounded-lg max-w-md ${message.isUser ? 'ml-2' : 'mr-2'}`}
              >
                <p className="text-blue-900 text-xl">{message.text}</p>
              </div>
              {message.isUser && (
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: '#1E3A8A' }}
                  className="p-2"
                />
              )}
            </div>
          ))
        )}
      </div>
      {/* Input Area */}
      <div className="flex items-center p-4 ">
        <input
          type="text"
          placeholder=" Mesajınızı buraya giriniz"
          className="flex-1 text-[32px] bg-blue-200 text-blue-900 placeholder-blue-400 p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          type="submit"
          className="p-2 ml-2 bg-blue-900 rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
}
export default ChatPage;
