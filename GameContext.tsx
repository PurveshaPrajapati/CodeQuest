
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export type Language = 'python' | 'java' | 'c' | 'c++';
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Character = 'wizard' | 'knight' | 'ninja' | 'scientist';
export type UserRole = 'beginner' | 'intermediate' | 'expert';

interface GameContextType {
  currentLevel: Level;
  unlockedLevels: Level[];
  experience: number;
  selectedCharacter: Character;
  selectedLanguage: Language;
  userRole: UserRole;
  setCurrentLevel: (level: Level) => void;
  unlockLevel: (level: Level) => void;
  addExperience: (points: number) => void;
  setSelectedCharacter: (character: Character) => void;
  setSelectedLanguage: (language: Language) => void;
  setUserRole: (role: UserRole) => void;
  isLevelUnlocked: (level: Level) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<Level[]>([1]);
  const [experience, setExperience] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>('wizard');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [userRole, setUserRole] = useState<UserRole>('beginner');

  const unlockLevel = (level: Level) => {
    if (!unlockedLevels.includes(level)) {
      setUnlockedLevels((prev) => [...prev, level]);
    }
  };

  const addExperience = (points: number) => {
    setExperience((prev) => prev + points);
  };

  const isLevelUnlocked = (level: Level) => {
    return unlockedLevels.includes(level);
  };

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        unlockedLevels,
        experience,
        selectedCharacter,
        selectedLanguage,
        userRole,
        setCurrentLevel,
        unlockLevel,
        addExperience,
        setSelectedCharacter,
        setSelectedLanguage,
        setUserRole,
        isLevelUnlocked,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
