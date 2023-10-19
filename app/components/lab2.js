"use client"
import { useState } from 'react';

const Home2 = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);
  const [key, setKey] = useState('');

  const handleToggle = () => {
    setIsEncrypting(!isEncrypting);
  };

  const handleProcess = () => {
    const text = inputText;
    const processingKey = key || "your_secret_key"; // Remplacez par votre clé

    let result = '';

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyCode = processingKey.charCodeAt(i % processingKey.length);
      const processedCharCode = isEncrypting ? charCode ^ keyCode : charCode ^ keyCode; // XOR opération
      result += String.fromCharCode(processedCharCode);
    }

    setOutputText(result);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <textarea
          className="w-full h-32 p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder={`Entrez le texte à ${isEncrypting ? 'chiffrer' : 'déchiffrer'}`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <input
          type="text"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Clé de chiffrement (facultatif)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button
          className="w-full p-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={handleProcess}
        >
          {isEncrypting ? 'Chiffrer' : 'Déchiffrer'}
        </button>

        <button
          className="w-full p-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
          onClick={handleToggle}
        >
          Passer à {isEncrypting ? 'Déchiffrement' : 'Chiffrement'}
        </button>

        <p className="mt-4">Résultat : {outputText}</p>
      </div>
    </div>
  );
};

export default Home2;
