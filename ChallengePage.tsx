
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import Challenge from './Challenge';

const levelChallenges = {
  1: [
    {
      id: 1,
      title: "Variable Declaration",
      description: "Create a variable 'message' and assign the string 'Hello, CodeQuest!' to it.",
      initialCode: {
        python: "# Declare your variable here\n\n\n# Don't modify the line below\nprint(message)",
        java: "class Main {\n  public static void main(String[] args) {\n    // Declare your variable here\n    \n    \n    // Don't modify the line below\n    System.out.println(message);\n  }\n}",
        c: "#include <stdio.h>\n\nint main() {\n  // Declare your variable here\n  \n  \n  // Don't modify the line below\n  printf(\"%s\\n\", message);\n  return 0;\n}",
        'c++': "#include <iostream>\nusing namespace std;\n\nint main() {\n  // Declare your variable here\n  \n  \n  // Don't modify the line below\n  cout << message << endl;\n  return 0;\n}"
      },
      expectedOutput: "Hello, CodeQuest!",
      hint: "In Python, you can declare a variable with: message = 'Hello, CodeQuest!'",
      xpReward: 20
    },
    {
      id: 2,
      title: "Data Types",
      description: "Create variables 'name' (string), 'age' (integer), and 'is_coder' (boolean) with sample values.",
      initialCode: {
        python: "# Create your variables here\n\n\n# Don't modify below\nprint(f\"Name: {name}, Age: {age}, Coder: {is_coder}\")",
        java: "class Main {\n  public static void main(String[] args) {\n    // Create your variables here\n    \n    \n    // Don't modify below\n    System.out.println(\"Name: \" + name + \", Age: \" + age + \", Coder: \" + is_coder);\n  }\n}",
        c: "#include <stdio.h>\n\nint main() {\n  // Create your variables here\n  \n  \n  // Don't modify below\n  printf(\"Name: %s, Age: %d, Coder: %d\\n\", name, age, is_coder);\n  return 0;\n}",
        'c++': "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  // Create your variables here\n  \n  \n  // Don't modify below\n  cout << \"Name: \" << name << \", Age: \" << age << \", Coder: \" << is_coder << endl;\n  return 0;\n}"
      },
      expectedOutput: "Name:",
      hint: "In Python: name = 'Your Name', age = 25, is_coder = True",
      xpReward: 25
    },
    {
      id: 3,
      title: "Type Conversion",
      description: "Convert the string '42' to an integer and multiply it by 2.",
      initialCode: {
        python: "# The string to convert\ntext_number = '42'\n\n# Convert and multiply\nresult = \n\n# Don't modify below\nprint(result)",
        java: "class Main {\n  public static void main(String[] args) {\n    // The string to convert\n    String textNumber = \"42\";\n    \n    // Convert and multiply\n    int result = \n    \n    // Don't modify below\n    System.out.println(result);\n  }\n}",
        c: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n  // The string to convert\n  char text_number[] = \"42\";\n  \n  // Convert and multiply\n  int result = \n  \n  // Don't modify below\n  printf(\"%d\\n\", result);\n  return 0;\n}",
        'c++': "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  // The string to convert\n  string text_number = \"42\";\n  \n  // Convert and multiply\n  int result = \n  \n  // Don't modify below\n  cout << result << endl;\n  return 0;\n}"
      },
      expectedOutput: "84",
      hint: "In Python: result = int(text_number) * 2",
      xpReward: 30
    }
  ],
  2: [
    // Simplified - would have challenges for level 2
    {
      id: 4,
      title: "If-Else Statement",
      description: "Write an if-else statement that checks if a number is even or odd.",
      initialCode: {
        python: "number = 7\n\n# Write your code here\n\n",
        java: "class Main {\n  public static void main(String[] args) {\n    int number = 7;\n    \n    // Write your code here\n    \n  }\n}",
        c: "#include <stdio.h>\n\nint main() {\n  int number = 7;\n  \n  // Write your code here\n  \n  return 0;\n}",
        'c++': "#include <iostream>\nusing namespace std;\n\nint main() {\n  int number = 7;\n  \n  // Write your code here\n  \n  return 0;\n}"
      },
      expectedOutput: "odd",
      hint: "Use the modulo operator % to check if a number is divisible by 2",
      xpReward: 30
    }
  ]
};

const ChallengePage = ({ onBack }: { onBack: () => void }) => {
  const { currentLevel } = useGameContext();
  const challenges = levelChallenges[currentLevel as keyof typeof levelChallenges] || [];
  
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Levels
        </Button>
        
        <LanguageSelector />
      </div>
      
      {challenges.length > 0 ? (
        <div>
          {challenges.map((challenge) => (
            <Challenge key={challenge.id} {...challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 game-card">
          <h3 className="text-xl font-bold mb-2">Coming Soon!</h3>
          <p>Challenges for this level are still being developed.</p>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
