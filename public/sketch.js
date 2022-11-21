// Based on Daniel Shiffman's Flappy Bird example

//test change

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
let circleSize = 42; //42
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

let px;
let py;
var collide;
let hitTop;

let addScore = true;
let finalScore = 0;
let totalPipes = 0;
let milliseconds;

let startTime;
let endTime;

let flyAnimation = [];
let dizzyAnimation = [];
let num = 0;
let frameDelay = 100;
let nextTimer = 0;

let collideAnim = false;
let dizzyCounter = 15;
let dizzyCooldown = 20;

let cloud1X = -150;
let cloud2X = -150;
let cloud3X = -150;
let cloud1Y = 0;
let cloud2Y = 0;
let cloud3Y = 0;
let clouds = [];

let saveFlag = 0;

let bars = [];

let title;

//preview buttons
let playIcon;

let statsButton;

function preload() {
  //an attempt to preload the model
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  flyAnimation[0] = loadImage("images/fly01.PNG"); 
  flyAnimation[1] = loadImage("images/fly02.PNG");
  flyAnimation[2] = loadImage("images/fly03.PNG");
  flyAnimation[3] = loadImage("images/fly04.PNG");

  dizzyAnimation[0] = loadImage("images/dizzy01.PNG");
  dizzyAnimation[1] = loadImage("images/dizzy02.PNG");
  dizzyAnimation[2] = loadImage("images/dizzy03.PNG");
  dizzyAnimation[3] = loadImage("images/dizzy04.PNG");
  
  clouds[0] = loadImage("images/cloud01.PNG");
  clouds[1] = loadImage("images/cloud02.PNG");
  clouds[2] = loadImage("images/cloud03.PNG");

  bars[0] = loadImage("images/bar01.png");
  bars[1] = loadImage("images/bar02.png");
  bars[2] = loadImage("images/bar01_red.png");
  bars[3] = loadImage("images/bar02_red.png");

  title = loadImage("images/title.png");

  // playIcon = loadImage("images/playicon.png");
}


function setup() {
  textAlign(CENTER);
  createCanvas(640, 480);
  textSize(20);
  textFont("Montserrat");
  textStyle(NORMAL);
  pipePos = height/2;

  nextTime = millis() + frameDelay;

  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  buttonBass = createButton("Bass");
  buttonBass.addClass("button");
  buttonBass.hide();

  buttonBassPlay = createImg("images/playicon.png");
  buttonBassPlay.hide();

  buttonTenor = createButton("Tenor");
  buttonTenor.addClass("button");
  buttonTenor.hide();

  buttonTenorPlay = createImg("images/playicon.png");
  buttonTenorPlay.hide();

  buttonAlto = createButton("Alto");
  buttonAlto.addClass("button");
  buttonAlto.hide();
  
  buttonAltoPlay = createImg("images/playicon.png");
  buttonAltoPlay.hide();

  buttonSoprano = createButton("Soprano");
  buttonSoprano.addClass("button");
  buttonSoprano.hide();

  buttonSopranoPlay = createImg("images/playicon.png");
  buttonSopranoPlay.hide();

  startButton = createButton("Start");
  startButton.addClass("button");
  startButton.hide();

  backButton = createButton("Back");
  backButton.addClass("button2");
  backButton.hide();

  saveButton = createButton("Save");
  saveButton.hide();

  restartButton = createButton("Next Round");
  restartButton.addClass("button");
  restartButton.hide();
  
  continueButton = createButton("Continue");
  continueButton.addClass("button");
  continueButton.hide();

  exitButton = createButton("Exit");
  exitButton.hide();

  buttonStartGame = createButton("Play");
  buttonStartGame.hide();
  buttonStartGame.addClass("button");

  statsButton = createButton("My Stats");
  statsButton.addClass("button");
  statsButton.position(590, 490);
  statsButton.mousePressed(viewStats);

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
  
  // speedSelect = createSelect();
  // speedSelect.option("Slowest (Easiest)",[1]);
  // speedSelect.option("Slow",[2]);
  // speedSelect.option("Neutral",[3]);
  // speedSelect.option("Fast",[4]);
  // speedSelect.option("Fastest (Hardest)",[5]);
  // speedSelect.option("6");
  // speedSelect.option("7");
  // speedSelect.option("8");
  // speedSelect.option("9");
  // speedSelect.option("10");

  speedSelect = createSlider(1, 5, 1, 1);
  speedSelect.position(30,120);
  // speedSelect.addClass("mySliders");
  speedSelect.hide();
  
  // gapSelect = createSelect();
  // gapSelect.option("Loosest (Easiest)",[1]);
  // gapSelect.option("Loose",[2]);
  // gapSelect.option("Neutral",[3]);
  // gapSelect.option("Precise",[4]);
  // gapSelect.option("Most Precise (Hardest)",[5]);
  // gapSelect.option("6");
  // gapSelect.option("7");
  // gapSelect.option("8");
  // gapSelect.option("9");
  // gapSelect.option("10");

  gapSelect = createSlider(1,5,1,1);
  gapSelect.position(230,120);
  // gapSelect.addClass("mySliders");
  gapSelect.hide();
  
//   intervalSelect = createSelect();
//   intervalSelect.option("1");
//   intervalSelect.option("2");
//   intervalSelect.option("3");
//   intervalSelect.option("4");
//   intervalSelect.option("5");
//   intervalSelect.option("6");
//   intervalSelect.option("7");
//   intervalSelect.option("8");
//   intervalSelect.option("9");
//   intervalSelect.option("10");
 
//   intervalSelect.hide();
}

function startPitch() {
  //starting the machine learning model
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
  //console.log("pitch starting");
}

function modelLoaded() {
  //this is callback function that's called when the model has loaded
  //console.log("model loaded");

  //what frame are we starting on?
  //console.log(firebase.auth().currentUser)
  //userId = firebase.auth().currentUser.uid;
  console.log(userId);
  firebase.database().ref('/users/' + userId).limitToLast(1).once('value').then(function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
        //console.log(childSnapshot.val());
        const data = childSnapshot.val();
        console.log(data);
        document.getElementById('user-info').textContent = "Range: " + data.range + " Speed: " + data.speed + " Interval: " + data.interval + " Gap: " + data.gap + " Score: " + data.score;

     });
});
  //data = firebase.database().ref('/users/' + userId);
  // console.log(scoreRef);
  // data.on('value', (snapshot) => {
  //   const data = snapshot.val();
  //   //console.log(data.gap);
  //   document.getElementById('user-info').textContent = "Range: " + data.range + " Speed: " + data.speed + " Interval: " + data.interval + " Gap: " + data.gap + " Score: " + data.score;
  // });
  getPitch();
}

function viewStats(){
  console.log("view stats");
  statsURL = "stats.html?uid=" + userId;
  statsURLdeploy = "https://flappy-tone-game.web.app/stats.html?uid=" + userId;
  window.open(statsURLdeploy);
}


function getPitch() {
  //gets a frequency, sets it to currentFreq, also converts to midi Note
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      if (state == 0) {
        state = 0.5;
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
  background(0, 113, 171);
  //print(waitCount);
  //print(state);
  //if we haven't started yet (model is still loading)

  
  // image(bars[0],width/2,height/2,70,500);

  if(collideAnim == false){
    cloud1X-=1;
    cloud2X-=1.2;
    cloud3X-= 1.4
  }else{
    cloud1X-=0.5;
    cloud2X-=0.6;
    cloud3X-=0.7
  }  
  if(cloud1X < -200){
    cloud1X = 650;
    cloud1Y = random(50,height-50);
  }
  
  if(cloud2X < -200){
    cloud2X = 650;
    cloud2Y = random(50,height-50);
  }

  if(cloud3X < -200){
    cloud3X = 650;
    cloud3Y = random(50,height-50);
  }

  if (state == 0) {
    fill(255);

    text("Loading...", width / 2, height / 2);
  }

  if (state == 0.5){
    image(title,0,0,width,height);
    buttonStartGame.position(width/2-50,height-50);
    buttonStartGame.show();
    buttonStartGame.mousePressed(startGame);
  }

  //module has loaded (start >0)

  if (state == 1) {
    //buttonLow.position(100, 490);
    buttonBass.position(50,400);
    buttonBassPlay.position(75,330);
    //buttonMed.position(250, 490);
    buttonTenor.position(200,400);
    buttonTenorPlay.position(225,330);

    //buttonHigh.position(400, 490);
    buttonAlto.position(350,400);
    buttonAltoPlay.position(375,330);

    buttonSoprano.position(500,400);
    buttonSopranoPlay.position(525,330);


//     buttonLow.show();
//     buttonMed.show();
//     buttonHigh.show();
    
    buttonBass.show();
    buttonBassPlay.show();
    buttonTenor.show();
    buttonTenorPlay.show();
    buttonAlto.show();
    buttonAltoPlay.show();
    buttonSoprano.show();
    buttonSopranoPlay.show();
    gapSelect.hide();
    speedSelect.hide();

    state = 2;
  }
  if (state == 2) {
    
    // buttonBass.mouseOver(bassPlay);
    buttonBassPlay.mousePressed(bassPlay);
    buttonBass.mouseOut(playFunction);
    // buttonTenor.mouseOver(tenorPlay);
    buttonTenorPlay.mousePressed(tenorPlay);
    buttonTenor.mouseOut(playFunction);
    // buttonAlto.mouseOver(altoPlay);
    buttonAltoPlay.mousePressed(altoPlay);
    buttonAlto.mouseOut(playFunction);
    // buttonSoprano.mouseOver(sopranoPlay);
    buttonSopranoPlay.mousePressed(sopranoPlay);
    buttonSoprano.mouseOut(playFunction);

    fill(255);
    textSize(30);
    text("RANGE SELECTION", width/2, height/2-140)
    textSize(15);
    text("Click the play icon (bottom) to preview each vocal range,", width/2, height/2-100);
    text("then click the top button to choose one", width/2, height/2-80);
    text("that you think suits your vocal range:", width/2, height/2-60);
    buttonBass.mousePressed(bass);
    buttonTenor.mousePressed(tenor);
    buttonAlto.mousePressed(alto);
    buttonSoprano.mousePressed(soprano);
  }

  //pipe count

  if (state == 3) {
        
    image(clouds[0],cloud1X,cloud1Y,150,99);
    image(clouds[1],cloud2X,cloud2Y,200,124);
    image(clouds[2],cloud3X,cloud3Y,200,84);


    if (pipeCount < numPipes + 1) {
      if (start == 0) {
        startButton.position(400, 490);
        backButton.position(100, 470);
        startButton.show();
        backButton.show();
        exitButton.hide();

        startButton.mousePressed(startPressed);
        backButton.mousePressed(backPressed);

        // text("Mode: ", width * 0.6, height * 0.4);
        // modeSelect.position(width * 0.6, height * 0.6);
        // modeSelect.show();
        // mode = modeSelect.value();
        mode = "Random Notes";
        //console.log(mode);
        
        textSize(20);
        text("Speed: ", 65,30);
        // speedSelect.position(30,130);
        speedSelect.show();

        text("Gap Size: ", 275,30);
        // gapSelect.position(210,130);
        gapSelect.show();

        textSize(15);
        text("Slowest <> Fastest", 105, 80);
        text("Largest <> Smallest", 307, 80);
        
        // text("Interval: ", 380,30);
        // intervalSelect.position(390,130);
        // intervalSelect.show();

        //as difficulty increases, speed increases (lower number is faster)
        //speed = 120 - (difficulty * 10);
      }
      if (currentFreq) {
        //text(currentNote, 300, 100);
        //let targetCircleY = map(currentFreq,voiceLow,voiceHigh,height,0,true);
        let targetCircleY = map(Math.log10(currentFreq),Math.log10(voiceLow),Math.log10(voiceHigh),height,0);
        let dy = targetCircleY - circleY;
        if(collideAnim == false){
        circleY += dy * easing;

        }

        //user circle

        fill(255);
        noStroke();
        circleVector.y = circleY;

        if(circleY < 0){
          circleY = 0;
        }
        
        if(circleY > height){
          circleY = height;
        }
        
        //ellipse(circleX, circleY, circleSize);
        history.push(circleY);

        if (history.length > historyLength) {
          history.splice(0, 1);
        }
        //console.log(circleY);
      }

      for (i = 0; i < history.length; i++) {
        let trailY = history[i];
        let trailX = map(i, 0, history.length, -history.length / 3, circleX);
        let trailSize = map(i, 0, history.length, 10, circleSize);
        let trailAlpha = map(i, 0, history.length, 0, 100);
        fill(233, 144, 120, trailAlpha);

        //ellipse(i+history.length, trailY, trailSize);
        ellipse(trailX-10, trailY, trailSize);
        fill(255);
      }

      if(dizzyCounter <= 48){
        collideAnim = true;
      }else{
        collideAnim = false;
        //dizzyCooldown
      }
      
      dizzyCounter += 1;
      dizzyCooldown += 1;

      if ((collideAnim == true)) {
        image(
          dizzyAnimation[num],
          circleX - 80,
          circleY - 80,
          circleSize * 3,
          circleSize * 4
        );
      } else {
        image(
          flyAnimation[num],
          circleX - 80,
          circleY - 80,
          circleSize * 3,
          circleSize * 4
        );
      }
        
        if (millis() > nextTimer){
          num += 1;
          if(num >= flyAnimation.length){
            num = 0;
          }
          nextTimer = millis() + frameDelay; 
        }

      //loop through array of pipes, show and update each one
      //see pipe.js
      if (start == 1) {
        waitCount += 1;

        exitButton.position(500,490);
        exitButton.addClass("button");
        exitButton.show();
        exitButton.mousePressed(exit);
        
        textSize(20);
        text("Speed: ", 65,30);        
        text("Gap Size: ", 275,30);
        textSize(15);
        text("Slowest <> Fastest", 105, 80);
        text("Largest <> Smallest", 307, 80);

        // text("Speed: ", 20,30);
        // text("Gap: ", 200,30);
        // text("Interval: ", 380,30);
        
        speedValue = speedSelect.value(); //1-5
        speed = 190 - (20 * speedValue);
        
        // interval = intervalSelect.value();
        interval = 6;  
        
        gap = gapSelect.value();
        
        for (i = pipes.length - 1; i >= 0; i--) {
  
          pipes[i].show();
          pipes[i].update();

          
        //hitbox

          collide = pointCircle(px, py, circleX, circleY);
         // console.log(collide);
          
         if (collide) {
          hit = 1;
          if(dizzyCooldown >= 100){
              dizzyCounter = 0;
              dizzyCooldown = 0;
          }
        } else {
          hit = 0;
        }

          //need to find a better way to do this
          if (pipes[i].x < 146 && pipes[i].x > 114 && hit == 0 && addScore == true) {
            score += 1;
            addScore = false;
          }
          
          if(pipes[i].x < 50) {
            addScore = true;
          }

          if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
          }
        }

        //create a new pipe every X number of frames after the model loads
        if ((frameCount - startFrame) % speed == 0 && waitCount > 200) {
          if (mode == "Random Notes" && collideAnim == false) {
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
        // fill(102, 255, 102);
        fill(255);
        text("Score: " + score + "/" + numPipes, 520,60);
        // text(score, 575, 40);
        // text("/" + numPipes, 600,40);
      }
    }
 
    //if max number of pipes reached
    else {
      text("Round Completed!", width/2, height/2);
      text("Score: " + score + "/" + numPipes, width/2, height/2 + 30);

      increaseDifficulty();
      //print(difficulty);
      endTime = millis()
      totalTime = endTime - startTime;
      //console.log(endTime);
      //console.log("Save Flag: " + saveFlag)
      if(saveFlag == 0){
        savePressed()
        saveFlag = 1;
      }
      
      // saveButton.position(300, 400);
      // saveButton.show();
      // saveButton.mousePressed(savePressed);
      restartButton.position(70, 490);
      restartButton.show();
      restartButton.mousePressed(restartPressed);

      //increase difficulty by 1
      //init();
    }
  }
  if(state == 4){
    textAlign(CENTER);
    // let milliseconds = millis();
    let minutes = milliseconds/60000;
    // let playTime = round(minutes,2);
    let playTime = parseInt((minutes).toFixed(3));
    text(24);
    stroke(255);
    text("Great Job! You Played for " + playTime + " Minutes!" ,width/2,height/2);
    text("Final Score: " + finalScore + "/" + totalPipes, width/2,height/2+30);
    text("Accuracy: " + finalScore/totalPipes*100 + "%", width/2, height/2+60);
    exitButton.hide();
    saveButton.hide();
    speedSelect.hide();
    gapSelect.hide();
    // restartButton.hide();

    increaseDifficulty();
    endTime = millis()
    totalTime = endTime - startTime;

    continueButton.position(width/2-50,490);
    continueButton.show();
    continueButton.mousePressed(restartPressed);

    // restartButton.position(70, 490);
    // restartButton.show();
    // restartButton.mousePressed(restartPressed);

  }
  function savePressed(){
    userId = firebase.auth().currentUser.uid;
    console.log(userId + "saved");
    
    var currDate = Date();
    var currentDateSeconds = Date.parse(currDate)/1000
    firebase.database().ref('users/' + userId + '/' + currentDateSeconds).set({
      range: range,
      speed: int(speedValue),
      interval: int(interval),
      gap: int(gap),
      score: score,
      time: totalTime
      //some more user data
    });
}

// function modeChanged(){
//   mode = modeSelect.value();
// }

function pointCircle(gx, gy, cx, cy) {
  if(hitTop){
    if(cy < py){
    gy = cy;
    }
  }else{
    if(cy > py){
    gy = cy;
    }
  }

 let d = dist(gx, gy, cx, cy);
  
  
  if(d <= circleSize/2) {
   return true; 
  }
  return false;
}

}
