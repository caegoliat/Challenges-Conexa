import { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../components/CharacterList'; 
import styles from './CharacterEpisodes.module.css';

interface Episode {
  id: number;
  name: string;
  characters: string[]; 
}

interface CharacterEpisodesProps {
  character1: Character;
  character2: Character;
}

const CharacterEpisodes: React.FC<CharacterEpisodesProps> = ({ character1, character2 }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        const allEpisodes: Episode[] = response.data.results;
        setEpisodes(allEpisodes);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, []);

  const renderCharacter1OnlyEpisodes = () => {
    if (!character1 || !episodes) return null;

    return episodes
      .filter((episode) => {
        const characterIds = episode.characters.map((url) => {
          const segments = url.split('/');
          return parseInt(segments[segments.length - 1], 10);
        });
        return characterIds.includes(character1.id) && !characterIds.includes(character2.id);
      })
      .map((episode) => (
        <li key={episode.id}>{episode.name}</li>
      ));
  };

  const renderSharedEpisodes = () => {
    if (!character1 || !character2 || !episodes) return null;

    return episodes
      .filter((episode) => {
        const characterIds = episode.characters.map((url) => {
          const segments = url.split('/');
          return parseInt(segments[segments.length - 1], 10);
        });
        return characterIds.includes(character1.id) && characterIds.includes(character2.id);
      })
      .map((episode) => (
        <li key={episode.id}>{episode.name}</li>
      ));
  };

  const renderCharacter2OnlyEpisodes = () => {
    if (!character2 || !episodes) return null;

    return episodes
      .filter((episode) => {
        const characterIds = episode.characters.map((url) => {
          const segments = url.split('/');
          return parseInt(segments[segments.length - 1], 10);
        });
        return characterIds.includes(character2.id) && !characterIds.includes(character1.id);
      })
      .map((episode) => (
        <li key={episode.id}>{episode.name}</li>
      ));
  };

  return (
    <div className={styles.episodesContainer}>
      <div className={styles.episodeSection}>
        <h2>Character #1 - Only Episodes</h2>
        <ul className={styles.episodeList}>
          {renderCharacter1OnlyEpisodes()}
        </ul>
      </div>

      <div className={styles.episodeSection}>
        <h2>Character #1 & Character #2 - Shared Episodes</h2>
        <ul className={styles.episodeList}>
          {renderSharedEpisodes()}
        </ul>
      </div>

      <div className={styles.episodeSection}>
        <h2>Character #2 - Only Episodes</h2>
        <ul className={styles.episodeList}>
          {renderCharacter2OnlyEpisodes()}
        </ul>
      </div>
    </div>
  );
};

export default CharacterEpisodes;