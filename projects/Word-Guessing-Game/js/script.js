class WordGame {
    constructor() {
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.wordsFound = 0;
        this.level = 1;
        this.maxLevel = 5;
        this.hintsUsed = 0;
        
        this.init();
    }

    init() {
        this.currentWord = null;
        this.maxGuesses = 0;
        this.incorrectLetters = [];
        this.correctLetters = [];
        this.guessedLetters = new Set();
        
        this.cacheElements();
        this.bindEvents();
        this.updateStats();
        this.startNewGame();
    }

    cacheElements() {
    this.elements = {
        inputs: document.querySelector(".inputs"),
        hint: document.querySelector(".hint span"),
        category: document.querySelector(".category span"),
        guessLeft: document.querySelector(".guess-left span"),
        wrongLetter: document.querySelector(".wrong-letter span"),
        resetBtn: document.querySelector(".reset-btn"),
        hintBtn: document.querySelector(".hint-btn"),
        skipBtn: document.querySelector(".skip-btn"),
        typingInput: document.querySelector(".typing-input"),
        score: document.getElementById("score"),
        bestScore: document.getElementById("bestScore"),
        wordsFound: document.getElementById("wordsFound"),
        level: document.getElementById("level"),
        message: document.getElementById("message"),
        virtualKeyboard: document.querySelector(".virtual-keyboard")
    };    
    if (!this.elements.typingInput) {
        console.error("❌ typingInput element not found! Check your HTML and CSS classes.");
        console.log("Available input elements:", document.querySelectorAll('input'));
    }
    
    return this.elements;
}

    bindEvents() {
        this.elements.resetBtn.addEventListener("click", () => this.startNewGame());
        this.elements.hintBtn.addEventListener("click", () => this.getExtraHint());
        this.elements.skipBtn.addEventListener("click", () => this.skipWord());
        this.elements.typingInput.addEventListener("input", (e) => this.handleInput(e));
        
        // Virtual keyboard events
        this.elements.virtualKeyboard.addEventListener("click", (e) => {
            if (e.target.classList.contains('key') && !e.target.classList.contains('used')) {
                this.elements.typingInput.value = e.target.textContent;
                this.handleInput({ target: this.elements.typingInput });
            }
        });

        document.addEventListener("keydown", () => this.elements.typingInput.focus());
        this.elements.inputs.addEventListener("click", () => this.elements.typingInput.focus());
    }

    startNewGame() {
        this.currentWord = getRandomWord(this.level);
        this.maxGuesses = Math.max(6, this.currentWord.word.length + 2 - this.level);
        this.incorrectLetters = [];
        this.correctLetters = [];
        this.guessedLetters.clear();

        this.updateDisplay();
        this.createInputFields();
        this.updateVirtualKeyboard();
        this.showMessage(`New word! Category: ${this.currentWord.category}`, 'info');
    }

    createInputFields() {
        this.elements.inputs.innerHTML = "";
        let html = "";
        for (let i = 0; i < this.currentWord.word.length; i++) {
            html += `<input type="text" disabled>`;
        }
        this.elements.inputs.innerHTML = html;
    }

    updateDisplay() {
        this.elements.hint.textContent = this.currentWord.hint;
        this.elements.category.textContent = this.currentWord.category;
        this.elements.guessLeft.textContent = this.maxGuesses;
        this.elements.wrongLetter.textContent = this.incorrectLetters.join(", ");
        this.elements.score.textContent = this.score;
        this.elements.bestScore.textContent = this.bestScore;
        this.elements.wordsFound.textContent = this.wordsFound;
        this.elements.level.textContent = this.level;
    }

    updateVirtualKeyboard() {
        const keys = this.elements.virtualKeyboard.querySelectorAll('.key');
        keys.forEach(key => {
            key.className = 'key';
            if (this.guessedLetters.has(key.textContent)) {
                if (this.currentWord.word.includes(key.textContent)) {
                    key.classList.add('correct');
                } else {
                    key.classList.add('used');
                }
            }
        });
    }

    handleInput(e) {
        let key = e.target.value.toLowerCase();
        
        if (key.match(/^[a-z]$/) && !this.guessedLetters.has(key)) {
            this.guessedLetters.add(key);
            
            if (this.currentWord.word.includes(key)) {
                // Correct guess
                this.correctLetters.push(key);
                this.updateWordDisplay();
                this.playCorrectAnimation();
            } else {
                // Incorrect guess
                this.maxGuesses--;
                this.incorrectLetters.push(key);
                this.showMessage(`Wrong guess! "${key}" is not in the word.`, 'error');
            }

            this.updateDisplay();
            this.updateVirtualKeyboard();
            this.checkGameStatus();
        }
        
        e.target.value = "";
    }

    updateWordDisplay() {
        const inputs = this.elements.inputs.querySelectorAll("input");
        for (let i = 0; i < this.currentWord.word.length; i++) {
            if (this.correctLetters.includes(this.currentWord.word[i])) {
                inputs[i].value = this.currentWord.word[i];
                inputs[i].classList.add('filled');
            }
        }
    }

    playCorrectAnimation() {
        const inputs = this.elements.inputs.querySelectorAll("input");
        inputs.forEach((input, index) => {
            if (input.value) {
                setTimeout(() => {
                    input.classList.add('bounce');
                    setTimeout(() => input.classList.remove('bounce'), 600);
                }, index * 100);
            }
        });
    }

    checkGameStatus() {
        setTimeout(() => {
            // Check win condition
            const wordGuessed = this.currentWord.word.split('').every(letter => 
                this.correctLetters.includes(letter)
            );

            if (wordGuessed) {
                this.handleWin();
            } else if (this.maxGuesses < 1) {
                this.handleLoss();
            }
        }, 100);
    }

    handleWin() {
        const wordScore = this.currentWord.word.length * 10 * this.level;
        const guessBonus = this.maxGuesses * 5;
        const totalScore = wordScore + guessBonus - (this.hintsUsed * 10);
        
        this.score += Math.max(0, totalScore);
        this.wordsFound++;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }

        // Level progression
        if (this.wordsFound % 3 === 0 && this.level < this.maxLevel) {
            this.level++;
            this.showMessage(`🎉 Level Up! Now at level ${this.level}`, 'success');
        }

        this.showMessage(
            `🎊 Correct! "${this.currentWord.word.toUpperCase()}" - +${totalScore} points!`, 
            'success'
        );

        setTimeout(() => this.startNewGame(), 1500);
    }

    handleLoss() {
        this.showMessage(
            `Game Over! The word was "${this.currentWord.word.toUpperCase()}"`, 
            'error'
        );
        this.revealWord();
        setTimeout(() => this.startNewGame(), 2000);
    }

    revealWord() {
        const inputs = this.elements.inputs.querySelectorAll("input");
        for (let i = 0; i < this.currentWord.word.length; i++) {
            inputs[i].value = this.currentWord.word[i];
            inputs[i].classList.add('filled');
        }
    }

    getExtraHint() {
        if (this.hintsUsed < 2) {
            const hiddenLetters = this.currentWord.word.split('').filter(letter => 
                !this.correctLetters.includes(letter)
            );
            
            if (hiddenLetters.length > 0) {
                const randomLetter = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
                this.correctLetters.push(randomLetter);
                this.updateWordDisplay();
                this.hintsUsed++;
                this.showMessage(`💡 Hint: Letter "${randomLetter}" revealed!`, 'info');
                this.updateDisplay();
            }
        } else {
            this.showMessage("No more hints available!", 'error');
        }
    }

    skipWord() {
        this.score = Math.max(0, this.score - 20);
        this.showMessage("Skipped! -20 points", 'error');
        this.startNewGame();
    }

    showMessage(text, type = 'info') {
        const message = this.elements.message;
        message.textContent = text;
        message.className = `message ${type} show`;
        
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    }

    updateStats() {
        this.elements.score.textContent = this.score;
        this.elements.bestScore.textContent = this.bestScore;
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wordGame = new WordGame();
});