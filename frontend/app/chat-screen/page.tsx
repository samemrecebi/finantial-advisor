import Image from 'next/image';
import tempImg from './temp.jpg';

export default function Home() {
  return (
    <div className="bg-blue-100 flex flex-col items-center justify-end min-h-screen p-4">
      <div className="p-64">
        <Image
          src={tempImg}
          alt="Centered Image"
          width={300} // replace with your image width
          height={300} // replace with your image height
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="flex w-full space-x-2">
        <input
          type="text"
          className="bg-blue-200 flex-grow p-2 border border-gray-300 rounded"
          placeholder="Soru sor..."
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Gönder
        </button>
      </div>
    </div>
  );
}
