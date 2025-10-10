const wordCategories = {
    programming: {
        name: "Programming & Tech",
        words: [
            { word: "python", hint: "A popular programming language named after a snake", difficulty: 1 },
            { word: "javascript", hint: "The language of the web browsers", difficulty: 2 },
            { word: "algorithm", hint: "A step-by-step procedure for calculations", difficulty: 2 },
            { word: "database", hint: "Organized collection of structured information", difficulty: 1 },
            { word: "function", hint: "A block of code designed to perform a particular task", difficulty: 1 },
            { word: "variable", hint: "Container for storing data values", difficulty: 1 },
            { word: "framework", hint: "Platform for developing software applications", difficulty: 2 },
            { word: "debugging", hint: "Process of finding and resolving defects", difficulty: 2 }
        ]
    },
    animals: {
        name: "Animals & Nature",
        words: [
            { word: "elephant", hint: "Largest land animal with a trunk", difficulty: 2 },
            { word: "butterfly", hint: "Insect with colorful wings that undergoes metamorphosis", difficulty: 2 },
            { word: "dolphin", hint: "Highly intelligent marine mammal", difficulty: 1 },
            { word: "penguin", hint: "Flightless bird that lives in cold climates", difficulty: 1 },
            { word: "kangaroo", hint: "Australian marsupial with powerful hind legs", difficulty: 2 },
            { word: "chameleon", hint: "Lizard that can change color", difficulty: 3 }
        ]
    },
    countries: {
        name: "Countries & Cities",
        words: [
            { word: "japan", hint: "Asian country known as the Land of the Rising Sun", difficulty: 1 },
            { word: "brazil", hint: "Largest country in South America", difficulty: 1 },
            { word: "canada", hint: "Northern country known for maple syrup", difficulty: 1 },
            { word: "australia", hint: "Country and continent surrounded by oceans", difficulty: 1 },
            { word: "egypt", hint: "North African country with ancient pyramids", difficulty: 1 }
        ]
    },
    science: {
        name: "Science & Technology",
        words: [
            { word: "gravity", hint: "Force that attracts objects toward each other", difficulty: 1 },
            { word: "quantum", hint: "Physics dealing with atomic and subatomic particles", difficulty: 3 },
            { word: "molecule", hint: "Group of atoms bonded together", difficulty: 2 },
            { word: "voltage", hint: "Electrical potential difference", difficulty: 2 },
            { word: "ecosystem", hint: "Biological community of interacting organisms", difficulty: 2 }
        ]
    },
    food: {
        name: "Food & Cooking",
        words: [
            { word: "avocado", hint: "Creamy green fruit often used in salads", difficulty: 2 },
            { word: "chocolate", hint: "Sweet brown food made from cacao beans", difficulty: 1 },
            { word: "spaghetti", hint: "Long thin pasta of Italian origin", difficulty: 1 },
            { word: "sandwich", hint: "Food consisting of fillings between bread slices", difficulty: 1 }
        ]
    }
};

function getRandomWord(level = 1) {
    const availableCategories = Object.keys(wordCategories);
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const category = wordCategories[randomCategory];
    
    // Filter words based on difficulty (level)
    const suitableWords = category.words.filter(w => w.difficulty <= level);
    const selectedWord = suitableWords[Math.floor(Math.random() * suitableWords.length)];
    
    return {
        ...selectedWord,
        category: category.name
    };
}

function getWordsByCategory(categoryName) {
    return wordCategories[categoryName]?.words || [];
}