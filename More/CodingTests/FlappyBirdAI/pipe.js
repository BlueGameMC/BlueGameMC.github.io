class Pipe
{
    constructor(x)
    {
        this.x = width + 40 + x;
        this.randomizeY();
    }

    update()
    {
        this.x -= speed;
    }

    show()
    {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, 0, 40, 150 - this.y)
        ctx.fillRect(this.x, 250  - this.y, 40, 400)
    }

    checkEdge()
    {
        if (this.x < -40) {
            this.x = width + 40;
            this.randomizeY();
        }
    }

    randomizeY()
    {
        this.y = Math.floor(Math.random() * 100) - 50;
    }

}