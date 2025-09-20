// Modular voice function with speed tuning and voice load check
function forceSpeak(text, callback = null) {
  speechSynthesis.cancel();

  const speakNow = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.4; // Snappier delivery
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    if (callback) utterance.onend = callback;
    speechSynthesis.speak(utterance);
  };

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = speakNow;
  } else {
    speakNow();
  }
}

// === Voice Blackjack Core ===
class VoiceBlackjackGame {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.currentlySpeaking = false;

    this.playerChips = 100;
    this.currentBet = 0;
    this.deck = [];
    this.playerHand = [];
    this.dealerHand = [];
    this.gamePhase = 'betting';

    this.initSpeechRecognition();
    this.setupEventListeners();
    this.createAndShuffleDeck();
    this.ensureSpeechWorks();
  }

  // Add your full Blackjack game logic here...
}

// Speech synthesis helper
function speak(text) {
  forceSpeak(text);
  const msgEl = document.getElementById('msg');
  if (msgEl) msgEl.textContent = text;
}

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

let firstInteractionDone = false;
let greeted = false;

// Voice command mapping
function handleVoiceCommand(transcript) {
  transcript = transcript.trim().toLowerCase();
  console.log('Heard:', transcript);
  if (transcript.includes('start')) {
    speak("Starting the game now.");
  } else if (transcript.includes('draw')) {
    speak("Drawing a card.");
  } else if (transcript.includes('undo')) {
    speak("Undoing last move.");
  } else if (transcript.includes('describe')) {
    speak("Board described.");
  } else if (transcript.includes('move')) {
    speak("Move card command received: " + transcript);
  } else if (transcript.includes('save')) {
    speak("Game saved.");
  } else if (transcript.includes('quit')) {
    speak("Game ended.");
  } else if (transcript.includes('help')) {
    speak("Say: start game, draw card, move card, undo, describe board, save game, quit game.");
  } else {
    speak("Command not recognized. Say help.");
  }
}

// Recognition event handlers
if (recognition) {
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    handleVoiceCommand(transcript);
  };
  recognition.onend = () => { recognition.start(); };
  recognition.onerror = (e) => { console.warn('Recognition error:', e); recognition.start(); };
}

// Unlock audio and start listening + greet on first tap
document.addEventListener('click', () => {
  if (!firstInteractionDone) {
    if (!greeted) {
      forceSpeak("Hi gorgeous! Ready to lose those chips?");
      greeted = true;
    }
    speak("Welcome to Voice Blackjack. Say 'start' to begin.");
    firstInteractionDone = true;
  }
  if (recognition) recognition.start();
}, { once: true });

if (!recognition) {
  speak("Sorry, your browser does not support voice commands. Try Chrome or Edge.");
}
