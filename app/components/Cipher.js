"use client"
import React, { useState } from 'react';

function createPolybiusSquare() {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const squareSize = 5;
  const polybiusSquare = [];

  let currentIndex = 0;
  for (let row = 0; row < squareSize; row++) {
    const rowArray = [];
    for (let col = 0; col < squareSize; col++) {
      rowArray.push(alphabet[currentIndex]);
      currentIndex++;
    }
    polybiusSquare.push(rowArray);
  }

  return polybiusSquare;
}

function findCharInPolybiusSquare(char, polybiusSquare) {
  for (let row = 0; row < polybiusSquare.length; row++) {
    for (let col = 0; col < polybiusSquare[row].length; col++) {
      if (polybiusSquare[row][col] === char) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
}

function polybiusEncrypt(message) {
  const polybiusSquare = createPolybiusSquare();
  const sanitizedMessage = message.toUpperCase().replace(/J/g, "I");
  let encryptedMessage = "";

  for (let i = 0; i < sanitizedMessage.length; i++) {
    const char = sanitizedMessage[i];
    if (char === " ") {
      encryptedMessage += " ";
      continue;
    }
    const [row, col] = findCharInPolybiusSquare(char, polybiusSquare);
    if (row !== -1 && col !== -1) {
      const newRow = (row + 1) % polybiusSquare.length;
      encryptedMessage += polybiusSquare[newRow][col];
    }
  }

  return encryptedMessage;
}

function polybiusDecrypt(encryptedMessage) {
  const polybiusSquare = createPolybiusSquare();
  let decryptedMessage = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i];
    if (char === " ") {
      decryptedMessage += " ";
      continue;
    }
    const [row, col] = findCharInPolybiusSquare(char, polybiusSquare);
    if (row !== -1 && col !== -1) {
      const newRow = row === 0 ? polybiusSquare.length - 1 : row - 1;
      decryptedMessage += polybiusSquare[newRow][col];
    }
  }

  return decryptedMessage;
}

export default function Home() {
  const [mode, setMode] = useState("encrypt");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const isEncryptMode = mode === "encrypt";

  const handleModeChange = () => {
    setMode(isEncryptMode ? "decrypt" : "encrypt");
    setMessage("");
    setResult("");
  };

  const handleProcess = () => {
    if (isEncryptMode) {
      const encrypted = polybiusEncrypt(message);
      setResult(encrypted);
    } else {
      const decrypted = polybiusDecrypt(message);
      setResult(decrypted);
    }
  };

  return (
    <div className="min-h-screen flex items-center  justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Carré de Polybe - {isEncryptMode ? "Chiffrement" : "Déchiffrement"}
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Message à {isEncryptMode ? "chiffrer" : "déchiffrer"} :
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          onClick={handleProcess}
        >
          {isEncryptMode ? "Chiffrer" : "Déchiffrer"}
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
          onClick={handleModeChange}
        >
          Passer en mode: {isEncryptMode ? "Déchiffrement" : "Chiffrement"}
        </button>
        {result && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Résultat :
            </label>
            <div className="border border-gray-300 rounded-md p-2">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
