
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ChallengeProps {
  id: number;
  title: string;
  description: string;
  initialCode: Record<string, string>;
  expectedOutput: string;
  hint: string;
  xpReward: number;
}

const Challenge: React.FC<ChallengeProps> = ({
  id,
  title,
  description,
  initialCode,
  expectedOutput,
  hint,
  xpReward,
}) => {
  const { selectedLanguage, addExperience } = useGameContext();
  const [code, setCode] = useState(initialCode[selectedLanguage]);
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  // Update code when language changes
  useEffect(() => {
    setCode(initialCode[selectedLanguage]);
    setOutput('');
  }, [selectedLanguage, initialCode]);

  // Improved function to simulate code execution and check answers
  const runCode = () => {
    // In a real app, this would actually execute the code
    // For now, we'll simulate code checking with a timeout
    setOutput('Running code...');
    
    setTimeout(() => {
      // More robust checking - normalize spaces and case for comparison
      const userCode = code.trim().toLowerCase();
      const expected = expectedOutput.trim().toLowerCase();
      
      // Check if the user's code contains the expected solution
      // or if it produces the expected output
      const isCorrect = userCode.includes(expected) || 
                        userCode === expected ||
                        // Check alternative solutions based on language patterns
                        (selectedLanguage === 'python' && userCode.includes('print(' + expected + ')')) ||
                        (selectedLanguage === 'java' && userCode.includes('system.out.println(' + expected + ')')) ||
                        (selectedLanguage === 'c' && userCode.includes('printf(' + expected + ')')) ||
                        (selectedLanguage === 'c++' && userCode.includes('cout <<' + expected));
      
      if (isCorrect) {
        setOutput(`Output: ${expectedOutput}`);
        
        if (!completed) {
          setCompleted(true);
          addExperience(xpReward);
          
          toast({
            title: "Challenge Complete!",
            description: `You earned ${xpReward} XP.`,
          });
        }
      } else {
        setOutput('Your solution doesn\'t produce the expected output. Try again!');
        console.log('Expected:', expected);
        console.log('User code:', userCode);
      }
    }, 1000);
  };

  const resetCode = () => {
    setCode(initialCode[selectedLanguage]);
    setOutput('');
  };

  return (
    <div className="p-6 game-card mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">
          {completed && <CheckCircle className="inline w-5 h-5 mr-2 text-game-secondary" />}
          {title}
        </h3>
        <span className="text-sm bg-game-primary/30 text-game-primary px-3 py-1 rounded-full">
          +{xpReward} XP
        </span>
      </div>
      
      <p className="mb-4 text-gray-300">{description}</p>
      
      {/* Code editor */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Your Code:</label>
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RefreshCw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
        
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono bg-gray-900 h-40 text-gray-100"
        />
      </div>
      
      {/* Output area */}
      {output && (
        <div className="mb-4 p-3 bg-gray-900 border border-gray-800 rounded-md">
          <div className="text-sm text-gray-400 mb-1">Output:</div>
          <div className={`font-mono ${output.includes('expected') ? 'text-red-400' : 'text-green-400'}`}>
            {output}
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 justify-between">
        {/* Hint button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHint(!showHint)}
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        
        {/* Run code button */}
        <Button onClick={runCode} className="bg-game-secondary hover:bg-game-secondary/90">
          Run Code
        </Button>
      </div>
      
      {/* Hint display */}
      {showHint && (
        <div className="mt-4 p-3 bg-game-primary/20 border border-game-primary/30 rounded-md">
          <p className="text-sm">{hint}</p>
        </div>
      )}
    </div>
  );
};

export default Challenge;
