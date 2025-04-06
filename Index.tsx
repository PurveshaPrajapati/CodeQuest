
import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import Header from '@/components/game/Header';
import LevelSelector from '@/components/game/LevelSelector';
import CharacterSelector from '@/components/game/CharacterSelector';
import ChallengePage from '@/components/game/ChallengePage';

const Index = () => {
  const [showChallenges, setShowChallenges] = useState(false);

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-game-background to-gray-900">
        <Header />
        
        <main className="container py-8 px-4 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              CodeQuest: Level Up Your Logic
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Solve coding puzzles and logic challenges to unlock new levels, characters, tools, and storylines.
            </p>
          </div>
          
          {showChallenges ? (
            <ChallengePage onBack={() => setShowChallenges(false)} />
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8">
                <CharacterSelector />
                
                {/* Game info card */}
                <div className="p-6 game-card">
                  <h3 className="text-xl font-semibold mb-3">Game Overview</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-game-primary mr-2 text-xs font-bold">1</span>
                      <span>Choose your character and level</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-game-primary mr-2 text-xs font-bold">2</span>
                      <span>Complete coding challenges to earn XP</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-game-primary mr-2 text-xs font-bold">3</span>
                      <span>Unlock new levels as you progress</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-game-primary mr-2 text-xs font-bold">4</span>
                      <span>Master programming concepts while having fun!</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <LevelSelector />
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setShowChallenges(true)}
                    className="px-6 py-3 bg-game-primary hover:bg-game-primary/80 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Start Current Level
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <footer className="py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>CodeQuest: Level Up Your Logic &copy; 2025</p>
        </footer>
      </div>
    </GameProvider>
  );
};

export default Index;
