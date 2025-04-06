
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import { Shield, Code, User, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Header = () => {
  const { currentLevel, experience, userRole } = useGameContext();
  
  // Calculate level progress - for demo purposes
  const levelExp = {
    min: (currentLevel - 1) * 100,
    max: currentLevel * 100
  };
  const progress = Math.min(100, Math.max(0, ((experience - levelExp.min) / (levelExp.max - levelExp.min)) * 100));

  return (
    <header className="w-full p-4 bg-gray-900/70 backdrop-blur-md border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-game-primary" />
          <h1 className="text-xl font-bold text-white hidden sm:block">CodeQuest</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Current level indicator */}
          <div className="flex items-center space-x-1">
            <Code className="w-5 h-5 text-game-secondary" />
            <span className="font-medium">Level {currentLevel}</span>
          </div>
          
          {/* XP bar */}
          <div className="flex items-center space-x-2 w-28 sm:w-40">
            <Progress value={progress} className="h-2 bg-gray-700" />
            <span className="text-xs whitespace-nowrap">{experience} XP</span>
          </div>
          
          {/* User role badge */}
          <Badge 
            variant="outline" 
            className={`
              ${userRole === 'beginner' ? 'border-blue-500 text-blue-400' : ''}
              ${userRole === 'intermediate' ? 'border-purple-500 text-purple-400' : ''}
              ${userRole === 'expert' ? 'border-game-accent text-game-accent' : ''}
            `}
          >
            <Award className="w-3 h-3 mr-1" />
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Badge>
          
          {/* User icon */}
          <div className="w-8 h-8 rounded-full bg-game-primary flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
