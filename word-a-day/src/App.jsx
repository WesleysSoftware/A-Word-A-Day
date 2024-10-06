import React, { useState, useEffect } from 'react';
// import './Word.css'

// Word component
const Word = ({ title, partOfSpeech, Def }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p><strong>Part of Speech:</strong> {partOfSpeech}</p>
      <p><strong>Definition:</strong> {Def}</p>
    </div>
  );
};

function RandomWordDictionary() {
  const [wordData, setWordData] = useState(null); // Store one word's data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWordData = async () => {
    try {
      // Fetch one random word
      const randomWordResponse = await fetch('https://random-word-api.herokuapp.com/word?number=1');

      if (!randomWordResponse.ok) {
        throw new Error(`Random Word API error: ${randomWordResponse.statusText}`);
      }

      const randomWords = await randomWordResponse.json();
      const word = randomWords[0]; // Get the first word

      // Fetch dictionary data for the word
      const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      if (dictionaryResponse.ok) {
        const dictionaryData = await dictionaryResponse.json();
        const firstMeaning = dictionaryData[0]?.meanings[0]; // Get the first meaning

        // Update the state with the selected word's details
        setWordData({
          title: word,
          partOfSpeech: firstMeaning?.partOfSpeech || 'Not available',
          Def: firstMeaning?.definitions[0]?.definition || 'Definition not available',
        });
      } else {
        setWordData(null);
      }

      setLoading(false); // Mark the loading as complete
    } catch (err) {
      console.error('Error fetching word data:', err);
      setError(`Failed to fetch data: ${err.message}`);
      setLoading(false);
    }
  };

  // useEffect with empty dependency array ensures fetchWordData runs only once
  useEffect(() => {
    if (!wordData) {
      fetchWordData(); // Fetch word data only once on component mount
    }
  }, [wordData]);

  return (
    <div>
      <h1>Random Word Information</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Render Word component only if wordData is available */}
      {!loading && !error && wordData && (
        <Word
          title={wordData.title}
          partOfSpeech={wordData.partOfSpeech}
          Def={wordData.Def}
        />
      )}
    </div>
  );
}

export default RandomWordDictionary;
