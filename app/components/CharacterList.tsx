import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CharacterList.module.css';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterListProps {
  onSelectCharacter: (character: Character, section: string) => void;
  characterSection: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ onSelectCharacter, characterSection }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const fetchedCharacters: Character[] = response.data.results.map((character: any) => ({
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          image: character.image
        }));
        setCharacters(fetchedCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    onSelectCharacter(character, characterSection);
  };

  return (
    <div className={`${styles.characterList} ${characterSection === 'Character #1' ? styles.character1 : ''}`}>
      <h2 className={styles.title}>{characterSection}</h2>
      <div className={styles.characterGrid}>
        {characters.map((character) => (
          <div
            key={character.id}
            className={selectedCharacter?.id === character.id ? styles.selectedCharacter : styles.character}
            onClick={() => handleSelectCharacter(character)}
          >
            <img src={character.image} alt={character.name} />
            <div className={styles.characterDetails}>
              <p className={styles.name}>{character.name}</p>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
