window.addEventListener('load', () => {
    // 1. The original greeting from script.js
    const greeting = new SpeechSynthesisUtterance("Hi gorgeous! Ready to lose those chips?!");
    greeting.lang = 'en-US';
    greeting.rate = 1;
    greeting.pitch = 1;
    speechSynthesis.speak(greeting);

    // 2. The main game logic from index.html's script tag
    // The code below is the same as the full content of the script tag in your index.html
    class VoiceBlackjackGame {
        constructor() {
            this.recognition = null;
            this.isListening = false;
            this.currentlySpeaking = false;
            
            // Game state
            this.playerChips = 100;
            this.currentBet = 0;
            this.deck = [];
            this.playerHand = [];
            this.dealerHand = [];
            this.gamePhase = 'betting';
            
            this.initSpeechRecognition();
            this.setupEventListeners();
            this.createAndShuffleDeck();
            
            // Force speech to work - try multiple times if needed
            this.ensureSpeechWorks();
        }
        
        // ... (rest of the VoiceBlackjackGame class code)
        // ...
        // All the functions and logic you had in the index.html script tag
    }
    
    // The line that initializes the game
    new VoiceBlackjackGame();
});