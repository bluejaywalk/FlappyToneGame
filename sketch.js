// Based on Daniel Shiffman's Flappy Bird example

//range of voice
let voiceLow = 100;
let voiceHigh = 450;

let osc = new p5.Oscillator(300); //oscillator

//higher number is slower, this is the number of frames in between pipes
let speed = 120;
let audioStream;

let currentFreq;
let currentNote;

//don't need this right now
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

//stuff for the circle
let circleSize = 42;
let circleY = 0;
let circleX = 130;
let easing = 0.3;
let circleVector;

let score = 0;

let song = [48, 48, 55, 55, 57, 57, 55, 53, 53, 52, 52, 50, 50, 48];
let currPipe = 0;

//are we starting the game
let state = 0;
let start = 0;

//array that stores the pipes
let pipes = [];
let pipeCount = 0;
let hit = 0;

//frame that we start the game on
let startFrame;

//ball's history for drawing the trail
let history = [];
let historyLength = 40;

let difficultySlider;
let difficulty = 1;

let modeSelect;
let mode;

let speedSelect;
let speedValue;

let gapSelect;
let gap;

let intervalSelect;
let interval;

let nCounter = 1;
let nodeCount = 3;
let pipePos;

//new variables below
let sd;
let numPipes = 10;

//keep track of whether or not to increase difficulty value
let increase = true;

let waitCount = 0;

function preload() {
  //an attempt to preload the model
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}

function setup() {
  createCanvas(640, 480);
  textSize(24);
  pipePos = height/2;

  //buttonLow = createButton("Low Voice");
  buttonBass = createButton("Bass");
  //buttonLow.hide();
  buttonBass.hide();
  //buttonMed = createButton("Medium Voice");
  buttonTenor = createButton("Tenor");
  //buttonMed.hide();
  buttonTenor.hide();
  //buttonHigh = createButton("High Voice");
  buttonAlto = createButton("Alto");
  //buttonHigh.hide();
  buttonAlto.hide();
  
  buttonSoprano = createButton("Soprano");
  buttonSoprano.hide();

  startButton = createButton("Start");
  startButton.hide();
  backButton = createButton("Back");
  backButton.hide();

  restartButton = createButton("Next Level");
  restartButton.hide();

  //setting a vector to the right side of the circle, useful for passing in between functions
  circleVector = createVector(circleX + 50, height / 2);

  //1 to 5
  // difficultySlider = createSlider(1, 5, 1, 1);
  // difficultySlider.hide();
  difficulty = 1;

  modeSelect = createSelect();
  modeSelect.position(width / 2, 200);
  modeSelect.option("Random Notes");
  modeSelect.option("Song 1");
  //modeSelect.changed(modeChanged);
  modeSelect.hide();
  
  speedSelect = createSelect();
  speedSelect.option("1");
  speedSelect.option("2");
  speedSelect.option("3");
  speedSelect.option("4");
  speedSelect.option("5");
  speedSelect.option("6");
  speedSelect.option("7");
  speedSelect.option("8");
  speedSelect.option("9");
  speedSelect.option("10");
  
  speedSelect.hide();
  
  gapSelect = createSelect();
  gapSelect.option("1");
  gapSelect.option("2");
  gapSelect.option("3");
  gapSelect.option("4");
  gapSelect.option("5");
  gapSelect.option("6");
  gapSelect.option("7");
  gapSelect.option("8");
  gapSelect.option("9");
  gapSelect.option("10");
  gapSelect.hide();
  
  intervalSelect = createSelect();
  intervalSelect.option("1");
  intervalSelect.option("2");
  intervalSelect.option("3");
  intervalSelect.option("4");
  intervalSelect.option("5");
  intervalSelect.option("6");
  intervalSelect.option("7");
  intervalSelect.option("8");
  intervalSelect.option("9");
  intervalSelect.option("10");
  
  intervalSelect.hide();
}

function startPitch() {
  //starting the machine learning model
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
  console.log("pitch starting");
}

function modelLoaded() {
  //this is callback function that's called when the model has loaded
  console.log("model loaded");

  //what frame are we starting on?

  getPitch();
}

function getPitch() {
  //gets a frequency, sets it to currentFreq, also converts to midi Note
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      if (state == 0) {
        state = 1;
      }
      currentFreq = frequency;

      let midiNumRound = freqToMidi(frequency); //gets closest midi note
      //need to compare actual frequency of the midi note that it rounded

      roundedNote = scale[midiNumRound % 12];
      //print(currentNote);
    }
    getPitch();
  });
}

function draw() {
  background(0);
  //print(waitCount);
  //print(state);
  //if we haven't started yet (model is still loading)

  if (state == 0) {
    fill(255);

    text("Loading...", width / 2, height / 2);
  }

  //module has loaded (start >0)

  if (state == 1) {
    //buttonLow.position(100, 490);
    buttonBass.position(50,490);
    //buttonMed.position(250, 490);
    buttonTenor.position(200,490);
    //buttonHigh.position(400, 490);
    buttonAlto.position(350,490);
    buttonSoprano.position(500,490);

//     buttonLow.show();
//     buttonMed.show();
//     buttonHigh.show();
    
    buttonBass.show();
    buttonTenor.show();
    buttonAlto.show();
    buttonSoprano.show();
    
    state = 2;
  }
  if (state == 2) {
    
    // buttonBass.mouseOver(Play);
    // buttonBass.mouseOut(playFunction);
    // buttonTenor.mouseOver(Play);
    // buttonTenor.mouseOut(playFunction);
    // buttonAlto.mouseOver(Play);
    // buttonAlto.mouseOut(playFunction);
    // buttonSoprano.mouseOver(Play);
    // buttonSoprano.mouseOut(playFunction);

    buttonBass.mousePressed(bass);
    buttonTenor.mousePressed(tenor);
    buttonAlto.mousePressed(alto);
    buttonSoprano.mousePressed(soprano);
  }

  //pipe count

  if (state == 3) {
    if (pipeCount < numPipes + 1) {
      if (start == 0) {
        startButton.position(400, 490);
        backButton.position(300, 490);
        startButton.show();
        backButton.show();

        startButton.mousePressed(startPressed);
        backButton.mousePressed(backPressed);

        // text("Difficulty: ", width * 0.3, height * 0.4);

        //difficultySlider.position(width * 0.3, height * 0.6);
        //difficultySlider.show();

        //difficulty
        //difficulty = difficultySlider.value();

        // difficulty = 1;

        // text(difficulty, width * 0.3, height * 0.55);

        text("Mode: ", width * 0.6, height * 0.4);
        modeSelect.position(width * 0.6, height * 0.6);
        modeSelect.show();
        mode = modeSelect.value();
        //console.log(mode);
        
        text("Speed: ", 20,30);
        speedSelect.position(30,130);
        speedSelect.show();

        text("Gap: ", 200,30);
        gapSelect.position(210,130);
        gapSelect.show();
        
        text("Interval: ", 380,30);
        intervalSelect.position(390,130);
        intervalSelect.show();
        
        

        //as difficulty increases, speed increases (lower number is faster)
        //speed = 120 - (difficulty * 10);
      }
      if (currentFreq) {
        //text(currentNote, 300, 100);
        //let targetCircleY = map(currentFreq,voiceLow,voiceHigh,height,0,true);
        let targetCircleY = map(Math.log10(currentFreq),Math.log10(voiceLow),Math.log10(voiceHigh),height,0);
        let dy = targetCircleY - circleY;
        circleY += dy * easing;

        //user circle
        fill(255);
        noStroke();
        circleVector.y = circleY;

        ellipse(circleX, circleY, circleSize);
        history.push(circleY);

        if (history.length > historyLength) {
          history.splice(0, 1);
        }
        //console.log(circleY);
      }

      for (i = 0; i < history.length; i++) {
        let trailY = history[i];
        let trailX = map(i, 0, history.length, -history.length / 3, circleX);
        let trailSize = map(i, 0, history.length, 20, circleSize);
        let trailAlpha = map(i, 0, history.length, 0, 100);
        fill(255, trailAlpha);
        //ellipse(i+history.length, trailY, trailSize);
        ellipse(trailX, trailY, trailSize);
      }

      //loop through array of pipes, show and update each one
      //see pipe.js
      if (start == 1) {
        waitCount += 1;
        
        text("Speed: ", 20,30);
        text("Gap: ", 200,30);
        text("Interval: ", 380,30);


        // if(speedSelect.value() == 1) {
        //   speed = 120;
        // }else if(speedSelect.value() == 2){
        //   speed = 60;
        // } 
        
        speedValue = speedSelect.value();
        speed = 150 - (10 * speedValue);
        
        interval = intervalSelect.value();
        
        gap = gapSelect.value();
        
        // if(gapSelect.value() == 1){
        //   gap = 100;
        // }else if(gapSelect.value() == 2){
        //   gap = 50;
        // }
        
        for (i = pipes.length - 1; i >= 0; i--) {
  
          pipes[i].show();
          pipes[i].update();

          if (pipes[i].hits(circleVector)) {
            hit = 1;
          } else {
            hit = 0;
          }

          //need to find a better way to do this
          if (pipes[i].x == 112 && hit == 0) {
            score += 1;
          }

          if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
          }
        }

        //create a new pipe every X number of frames after the model loads
        if ((frameCount - startFrame) % speed == 0 && waitCount > 200) {
          if (mode == "Random Notes") {
            pipes.push(new Pipe());
          }

          pipeCount += 1;
          //print(pipe);
          currPipe += 1;
          if(currPipe % nodeCount == 0){
            if(interval <= 5){
              nodeCount = int(random(3,4));
            }else if (interval > 5 ){
              nodeCount = int(random(2,4));
            }else if (interval > 7){
              nodeCount = int(random(1,3));
            }
            if(pipePos < height/2){
              pipePos = int(random(height/2,height));
            }else if(pipePos >= height/2){
              pipePos = int(random(0,height/2));
            }
          }
        }

        //display score
        textSize(24);
        strokeWeight(1);
        fill(102, 255, 102);
        text("Score: ", 500,40);
        text(score, 600, 40);
      }
    }

    //if max number of pipes reached
    else {
      text("Game Over", 20, 150);
      text("Final Score: " + score + "/" + numPipes, 20, 80);
      increaseDifficulty();
      //print(difficulty);
      restartButton.position(400, 490);
      restartButton.show();
      restartButton.mousePressed(restartPressed);

      //increase difficulty by 1
      //init();
    }
  }
}

// function modeChanged(){
//   mode = modeSelect.value();
// }


