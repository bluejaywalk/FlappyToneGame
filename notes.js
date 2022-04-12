let notes = [];
let playing = 0;
let currNote = 0;
let count = 0;

function lowVoice() {
  console.log("low voice");
  voiceLow = 110;
  voiceHigh = 311;
  buttonLow.hide();
  buttonMed.hide();
  buttonHigh.hide();
  state = 3;
}

function medVoice() {
  console.log("med voice");
  voiceLow = 150;
  voiceHigh = 600;
  buttonLow.hide();
  buttonMed.hide();
  buttonHigh.hide();

  for (i = 0; i < notes.length; i++) {
    //notes[i] += 4;
  }
  state = 3;
}

function highVoice() {
  console.log("high voice");
  voiceLow = 200;
  voiceHigh = 900;
  buttonLow.hide();
  buttonMed.hide();
  buttonHigh.hide();
  state = 3;
}

function lowRangePlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(100);
  // osc.freq(450, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [45, 47, 49, 50, 52, 54, 56, 57];
  playing = 1;
  playNote();
}

function medRangePlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(150);
  // osc.freq(600, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [52, 54, 56, 57, 59, 61, 63, 64];
  playing = 1;
  playNote();
}

function highRangePlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(200);
  // osc.freq(900, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [59, 61, 63, 64, 66, 68, 70, 71];
  playing = 1;
  playNote();
}

function playNote() {
  if (playing == 1) {
    osc.start();
    osc.freq(midiToFreq(notes[currNote]));
    osc.amp(0.5);
    console.log("play note");
    if (currNote < 8) {
      currNote++;
      setTimeout(playNote, 400);
    } else {
      osc.stop();
      currNote = 0;
    }
  } else {
    osc.stop();
    currNote = 0;
  }
}

function playFunction() {
  if (playing == 1) {
    playing = 0;
  }
}

function startPressed() {
  startButton.hide();
  backButton.hide();
  //difficultySlider.hide();
  modeSelect.hide();
  startFrame = frameCount;
  start = 1;
}

function backPressed() {
  startButton.hide();
  backButton.hide();
  difficultySlider.hide();
  modeSelect.hide();
  state = 1;
}

//restart the game with higher difficulty
function restartPressed() {
  restartButton.hide();
  init();
}

//initalize variables and state
function init() {
  score = 0;
  pipeCount = 0;
  currPipe = 0;
  state = 3;
  increase = true;
  start = 0;
}

//increase difficulty by 1
function increaseDifficulty() {
  if (increase && difficulty < 5) {
    difficulty += 1;
  }
  increase = false;
}
