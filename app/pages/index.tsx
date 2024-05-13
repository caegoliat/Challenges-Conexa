import { useState } from 'react';
import CharacterList, { Character } from '../components/CharacterList';
import CharacterEpisodes from '../components/CharacterEpisodes';
import styles from '../styles.module.css'; 

const Home: React.FC = () => {
  const [selectedCharacter1, setSelectedCharacter1] = useState<Character | null>(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState<Character | null>(null);

  const handleSelectCharacter = (character: Character, section: string) => {
    if (section === 'Character #1') {
      setSelectedCharacter1(character);
    } else if (section === 'Character #2') {
      setSelectedCharacter2(character);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.charactersContainer}>
        <div className={styles.column}>
          <CharacterList onSelectCharacter={handleSelectCharacter} characterSection="Character #1" />
        </div>
        <div className={styles.column}>
          <CharacterList onSelectCharacter={handleSelectCharacter} characterSection="Character #2" />
        </div>
      </div>
      {selectedCharacter1 && selectedCharacter2 && (
        <div className={styles.episodesContainer}>
          <CharacterEpisodes character1={selectedCharacter1} character2={selectedCharacter2} />
        </div>
      )}
    </div>
  );
};

export default Home;
