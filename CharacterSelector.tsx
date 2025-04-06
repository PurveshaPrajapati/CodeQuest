
import React from 'react';
import { useGameContext, Character } from '@/context/GameContext';
import { Sparkles } from 'lucide-react';

const characters: { id: Character; name: string; color: string }[] = [
  { id: 'wizard', name: 'Wizard', color: 'bg-purple-600' },
  { id: 'knight', name: 'Knight', color: 'bg-blue-600' },
  { id: 'ninja', name: 'Ninja', color: 'bg-green-600' },
  { id: 'scientist', name: 'Scientist', color: 'bg-yellow-600' },
];

const CharacterSelector = () => {
  const { selectedCharacter, setSelectedCharacter } = useGameContext();

  return (
    <div className="p-6 game-card">
      <h3 className="text-xl font-semibold text-center mb-4">Choose Your Character</h3>
      
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        {characters.map((char) => (
          <div key={char.id} className="flex flex-col items-center">
            <button
              onClick={() => setSelectedCharacter(char.id)}
              className={`hexagon ${char.color} mb-2 ${
                selectedCharacter === char.id 
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' 
                  : 'opacity-70 hover:opacity-100 transition-opacity'
              }`}
            >
              {selectedCharacter === char.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-white animate-pulse" />
                </div>
              )}
            </button>
            <span className="text-sm font-medium">{char.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector;
