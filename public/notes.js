let notes = [];
let playing = 0;
let currNote = 0;
let count = 0;

function bass() {
  //console.log("bass");
    //A2
  range = "Bass"
  voiceLow = 110;
  //Eb4
  voiceHigh = 261.63;
  buttonBass.hide();
  buttonTenor.hide();
  buttonAlto.hide();
  buttonSoprano.hide();
  state = 3;
}

function tenor() {
  //console.log("tenor");
  range = "Tenor";
  voiceLow = 130.81;
  voiceHigh = 329.63;
  buttonBass.hide();
  buttonTenor.hide();
  buttonAlto.hide();
  buttonSoprano.hide();

  for (i = 0; i < notes.length; i++) {
    //notes[i] += 4;
  }
  state = 3;
}

function alto() {
  //console.log("alto");
  range = "Alto"
  voiceLow = 196.00;
  voiceHigh = 523.25;
  buttonBass.hide();
  buttonTenor.hide();
  buttonAlto.hide();
  buttonSoprano.hide();
  state = 3;
}

function soprano() {
  //console.log("soprano");
  range = "Soprano"
  voiceLow = 261.63;
  voiceHigh = 659.25;
  buttonBass.hide();
  buttonTenor.hide();
  buttonAlto.hide();
  buttonSoprano.hide();
  state = 3;
}

function bassPlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(100);
  // osc.freq(450, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [45, 47, 49, 50, 52, 54, 56, 57];
  playing = 1;
  playNote();
}

function tenorPlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(150);
  // osc.freq(600, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [48, 50, 52, 53, 55, 57, 59, 60];
  playing = 1;
  playNote();
}

function altoPlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(200);
  // osc.freq(900, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [55, 57, 59, 60, 62, 64, 66, 67];
  playing = 1;
  playNote();
}

function sopranoPlay() {
  // osc.start();
  // osc.amp(0.5);
  // osc.freq(200);
  // osc.freq(900, 3);
  // osc.amp(0, 0.1, 0.7);
  notes = [60, 62, 64, 65, 67, 69, 71, 72];
  playing = 1;
  playNote();
}

function Play() {
  playing = 1;
  playNote();
}

function playNote() {
  if (playing == 1) {
    osc.start();
    osc.freq(midiToFreq(notes[currNote]));
    osc.amp(0.5);
    //console.log("play note");
    if (currNote < 8) {
      currNote++;
      setTimeout(playNote, 200);
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
  //difficultySlider.hide();
  modeSelect.hide();
  state = 1;
}

//restart the game with higher difficulty
function restartPressed() {
  restartButton.hide();
  saveButton.hide();
  saveFlag = 0;
  init();
}

function exit(){
  state = 4;
  milliseconds = millis();
}

//initalize variables and state
function init() {
  score = 0;
  pipeCount = 0;
  currPipe = 0;
  state = 3;
  increase = true;
  start = 0;
  waitCount = 0;
  pipes = [];
  if(difficulty > 2){
    numPipes = 20;
  }
}

//increase difficulty by 1
function increaseDifficulty() {
  if (increase && difficulty < 5) {
    difficulty += 1;
    finalScore += score;
    totalPipes += numPipes;
  }
  increase = false;
}
