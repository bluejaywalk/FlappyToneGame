// Based on Daniel Shiffman's Flappy Bird example

class Pipe{
  
  constructor(_centerMidi){
    if(_centerMidi === undefined){
      this.spacing = 175 - (15*difficulty);
  
      //this.top = random(height / 6, 3 / 4 * height);
      
      //standard deviation changes as difficulty increases
      sd = 25 * difficulty;
      this.top = randomGaussian(height/2-75,sd);
      
      //make sure that the pipe does not cover the whole screen
      if(this.top > height - 150){
        this.top = height - 150;
      }
      
      if(this.top < 10){
        this.top = 10;
      }
      
      this.bottom = height - (this.top + this.spacing);
      this.center = this.bottom - this.top;
    }
    else{
  this.centerMidi = _centerMidi;
  this.centerFreq = midiToFreq(this.centerMidi);
  this.center = map(this.centerFreq, 110, 311, height, 0);
  this.top = this.center - 50;
  this.bottom = height - (this.top + 100);
    }
  console.log(_centerMidi);
 
  
  this.x = width;
  this.w = 70;
  this.speed = 6;
  
  this.highlight = false;

  }
 
  hits(vec) {
    if (vec.y < this.top || vec.y > height - this.bottom) {
      if (vec.x > this.x && vec.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  show() {
    fill(255);
    stroke(100);
    strokeWeight(10);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    //print("top: " + this.top + " bottom: " + this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
