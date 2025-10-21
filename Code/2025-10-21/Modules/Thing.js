class Thing {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }

    draw() {
        // draw losange shape at (this.x, this.y)
        /* push();
        translate(this.x, this.y);
        strokeWeight(3);
        fill(220);
        beginShape();
        vertex(0, -20);
        vertex(20, 0);
        vertex(0, 20);
        vertex(-20, 0);
        endShape(CLOSE);
        pop();
 */
        // draw line with rotation 45 degrees
        push();
        translate(this.x, this.y);
        rotate(radians(45));
        strokeWeight(3);
        line(-20, 0, 20, 0);
        pop();
    }
}