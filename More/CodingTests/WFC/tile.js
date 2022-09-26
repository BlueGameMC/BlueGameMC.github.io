class Tile
{
    constructor(img, edges)
    {
        this.img = img;
        this.edges = edges;
    }

    rotateImg(rotateValue)
    {

        const w = this.img.width;
        const h = this.img.height;

        const newImg = createGraphics(w, h);
        newImg.imageMode(CENTER);
        newImg.translate(w / 2, h / 2);
        newImg.rotate(HALF_PI * rotateValue);
        newImg.image(this.img, 0, 0);


        var newEdges = [];
        var len = this.edges.length;
        for(let i = 0; i < len; i++)
        {
            newEdges[i] = this.edges[(i - rotateValue + len) % len];
        }

        return new Tile(newImg, newEdges);
        
    }

}