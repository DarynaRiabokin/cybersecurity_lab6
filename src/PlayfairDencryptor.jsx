/* eslint-disable react/prop-types */
import { useState } from "react";

const PlayfairDecryptor = ({ keyMatrix }) => {
  const [cipherText, setCipherText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const findPosition = (letter) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (keyMatrix[row][col] === letter) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const decryptBigram = (a, b) => {
    const posA = findPosition(a);
    const posB = findPosition(b);

    if (!posA || !posB) return a + b;

    // Правило 1: якщо в одному рядку
    if (posA.row === posB.row) {
      return (
        keyMatrix[posA.row][(posA.col + 4) % 5] + // Зсув ліворуч на 1 позицію
        keyMatrix[posB.row][(posB.col + 4) % 5]
      );
    }
    // Правило 2: якщо в одному стовпці
    else if (posA.col === posB.col) {
      return (
        keyMatrix[(posA.row + 4) % 5][posA.col] + // Зсув вгору на 1 позицію
        keyMatrix[(posB.row + 4) % 5][posB.col]
      );
    }
    // Правило 3: якщо формують прямокутник
    else {
      return keyMatrix[posA.row][posB.col] + keyMatrix[posB.row][posA.col];
    }
  };

  const decryptText = () => {
    let bigrams = [];
    for (let i = 0; i < cipherText.length; i += 2) {
      const first = cipherText[i];
      const second = cipherText[i + 1] || "х"; // Заповнюємо "х", якщо немає другої літери
      bigrams.push(first + second);
    }
    const decrypted = bigrams
      .map((bigram) => decryptBigram(bigram[0], bigram[1]))
      .join("");
    setDecryptedText(decrypted);
  };

  return (
    <div className="p-4">
      <textarea
        placeholder="Введіть текст для дешифрування"
        value={cipherText}
        onChange={(e) => setCipherText(e.target.value.toLowerCase())}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={decryptText}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Дешифрувати
      </button>
      {decryptedText && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-50">
          <strong>Відкритий текст:</strong> {decryptedText}
        </div>
      )}
    </div>
  );
};

export default PlayfairDecryptor;