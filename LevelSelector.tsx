
import React from 'react';
import { useGameContext, Level } from '@/context/GameContext';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface LevelInfo {
  id: Level;
  title: string;
  concept: string;
  challenges: number;
}

const levels: LevelInfo[] = [
  { id: 1, title: "Rookie Realm", concept: "Variables & Data Types", challenges: 3 },
  { id: 2, title: "Decision Domain", concept: "Conditional Statements", challenges: 4 },
  { id: 3, title: "Loop Labyrinth", concept: "Loops", challenges: 3 },
  { id: 4, title: "Function Fortress", concept: "Functions", challenges: 4 },
  { id: 5, title: "Array Archipelago", concept: "Arrays & Strings", challenges: 5 },
  { id: 6, title: "Recursion Ruins", concept: "Recursion", challenges: 3 },
  { id: 7, title: "Algorithm Ascent", concept: "Advanced Concepts", challenges: 5 },
];

const LevelSelector = () => {
  const { currentLevel, isLevelUnlocked, setCurrentLevel } = useGameContext();
  const { toast } = useToast();

  const handleLevelClick = (level: Level) => {
    if (isLevelUnlocked(level)) {
      setCurrentLevel(level);
      toast({
        title: `Level ${level} selected`,
        description: `Entering ${levels[level - 1].title}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Level locked",
        description: "Complete the previous level to unlock this one.",
      });
    }
  };

  return (
    <div className="p-6 game-card">
      <h2 className="text-2xl font-bold text-center mb-6">Select Level</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const isCurrent = currentLevel === level.id;
          
          return (
            <div
              key={level.id}
              className={`level-card ${unlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
              onClick={() => handleLevelClick(level.id)}
            >
              <div className="absolute top-2 right-2">
                {unlocked ? (
                  <CheckCircle className="w-5 h-5 text-game-secondary" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-500" />
                )}
              </div>
              
              <h3 className="text-lg font-bold mb-1">{level.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{level.concept}</p>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gray-800 text-white">
                  {level.challenges} Challenges
                </Badge>
                
                {isCurrent && (
                  <Badge className="bg-game-primary">
                    Current
                  </Badge>
                )}
              </div>
              
              {unlocked && !isCurrent && (
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
