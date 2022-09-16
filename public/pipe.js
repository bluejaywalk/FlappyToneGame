// Based on Daniel Shiffman's Flappy Bird example

class Pipe{    
  constructor(_centerMidi){
    
      this.randRange = random((-50 - 7*interval),(50 + 7*interval));
    
      this.spacing = 175 - (20*gap);
    
      // print(pipePos);
      this.top = pipePos + this.randRange;
      
      //interval increase decreases range of pipe clusters
      
      //make sure that the pipe does not cover the whole screen
      if(this.top > height - 150){
        this.top = height - 150;
      }
      
      if(this.top < 10){
        this.top = 10;
      }
      
      this.bottom = height - (this.top + this.spacing);
      this.center = this.bottom - this.top;
  
  this.x = width;
  this.w = 70;
  
  // this.speed = 3.5 + (speedValue/2);
  
  this.highlight = false;

  }

  show() {
    
    fill(255);
    stroke(100);
    // strokeWeight(10);
    noStroke();
    if (collide && pipes[i].x < 146 && pipes[i].x > 114) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    px = this.x;
    // py = this.top + this.spacing;
    if(circleY < this.top + this.spacing/2){
      py = this.top;
      hitTop = true;
    } else {
      py = this.top + this.spacing;
      hitTop = false;
    }
    //console.log(px,py);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    //print("top: " + this.top + " bottom: " + this.bottom);

  }

  update() {

    if(collideAnim == false){
      this.x -= (3.5 +(speedValue/2));
    }

    // this.x -= (3.5 +(speedValue/2));
    // this.x -= (speedValue);
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
