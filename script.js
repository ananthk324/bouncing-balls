// setting up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
const width = canvas.width;
canvas.height = window.innerHeight;
const height = canvas.height

//Array to store the created balls
let balls = [];

class Ball {
	//constructor function with properties of ball
   constructor(x, y, vX, vY, color, size) {
      this.x = x;
      this.y = y;
      this.vX = vX;
      this.vY = vY;
      this.color = color;
      this.size = size;
   }
	
	//to draw balls defined above into canvas
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      ctx.fill();
   }
	
   //updates the position and speed of balls when they are at edge of canvas
   update() {
      if ((this.x + this.size) >= width) {
         this.vX = -(this.vX);
      }

      if ((this.x - this.size) <= 0) {
         this.vX = -(this.vX);
      }

      if ((this.y + this.size) >= height) {
         this.vY = -(this.vY);
      }

      if ((this.y - this.size) <= 0) {
         this.vY = -(this.vY);
      }

      this.x += this.vX;
      this.y += this.vY;
   }

	//updates the color of ball when they collide, using 2D collision detection algorithm
   collisionDetect() {
      for (let i = 0; i < balls.length; i++) {
         if (!(this === balls[i])) {
            const diffX = this.x - balls[i].x;
            const diffY = this.y - balls[i].y;
            const distance = Math.sqrt(diffX*diffX + diffY*diffY);

            if (distance < this.size + balls[i].size) {
              balls[i].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
         }
      }
   }

}

// function to generate random number
function random(min,max) {
   return Math.floor(Math.random()*(max-min+1)+min);
}

//creating 10 balls and pushing it to Balls array
while (balls.length < 10) {
   const size = random(5,25);
   let ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-5,5),
      random(-5,5),
      'rgb(random(0,255),random(0,255),random(0,255))',
      size);
  balls.push(ball);
}

function loop() {
   //filling canvas with background color each time
   ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
   ctx.fillRect(0, 0, width, height);

   for (let i = 0; i < balls.length; i++) {
     balls[i].draw();
     balls[i].update();
     balls[i].collisionDetect();
   }
   requestAnimationFrame(loop);
}

loop();