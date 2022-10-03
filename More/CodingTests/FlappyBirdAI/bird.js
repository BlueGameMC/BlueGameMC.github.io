class Bird
{
    constructor()
    {
        this.y = height/2;
        this.x = 20;
        this.vel = 0;
        this.alive = true;
        this.fitness = 0;
        this.colorR = Math.random() * 255;
        this.colorG = Math.random() * 255;
        this.colorB = Math.random() * 255;
    }

    show()
    {
        if (this.alive) {
            ctx.fillStyle = "rgb(" + this.colorR + "," + this.colorG + ", " + this.colorB + ")";
            ctx.fillRect(this.x, this.y, 20, 20)
        }
    }

    update()
    {
        if (this.alive == true) {
            this.y -= this.vel;
            this.vel -= 0.04;
            this.fitness += 1;
        }
    }

    flap()
    {
        if (this.alive == true) {
            this.vel = 2;
        }
    }

    checkCollision()
    {
        if (this.alive == true) {
            if (this.y > height || this.y < 0) {
                this.alive = false;
                birdCount--;
            }
            else
            {

                for (let i = 0; i < pipes.length; i++) {
                    let pipe = pipes[i];
                    
                    if (pipe.x >= -20 && pipe.x <= 40) 
                    {
                        if (this.y < 150 - pipe.y || this.y > 230 - pipe.y) 
                        {
                            this.alive = false;
                            birdCount--;
                        }
                    }
                    
                }
            }
        }
    }

}