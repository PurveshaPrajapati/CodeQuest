
import React from 'react';
import { useGameContext, Language } from '@/context/GameContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code2 } from 'lucide-react';

const languages: { id: Language; name: string }[] = [
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'c', name: 'C' },
  { id: 'c++', name: 'C++' },
];

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = useGameContext();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm text-gray-300">
        <Code2 className="w-4 h-4 text-game-primary" />
        <span>Language:</span>
      </div>
      
      <Select 
        value={selectedLanguage} 
        onValueChange={(value) => setSelectedLanguage(value as Language)}
      >
        <SelectTrigger className="w-[120px] border-gray-700 bg-gray-800">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {languages.map((lang) => (
            <SelectItem key={lang.id} value={lang.id} className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
