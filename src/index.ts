import p5 from 'p5';
const rectRadius = 10;
let drag = 999;

const sketch = (p: p5): void => {

  const points: p5.Vector[] = [
    (new p5.Vector()).set(100, 100),
    (new p5.Vector()).set(200, 100),
    (new p5.Vector()).set(200, 200)
  ];

  const doDraw = (): void => {
    p.background(200);

    p.noStroke();
    p.fill(255, 0, 0, 128);
    
    points.forEach((point) => {
      p.rect(point.x, point.y, rectRadius, rectRadius);
    });

  };

  p.setup = (): void => {
    p.createCanvas(640, 480);
    p.rectMode(p.CENTER);

    doDraw();
  };

  p.mousePressed = (): void => {
    for (let n = 0; n < points.length; ++n)
    {
      const v = points[n];
      if (Math.abs(p.mouseX - v.x) <= rectRadius && Math.abs(p.mouseY - v.y) <= rectRadius)
      {
        drag = n;
        return;
      }
    }
    
    drag = 999;
  };
  
  p.mouseDragged = (): void => {
    if (drag < points.length)
    {
      points[drag].x = p.mouseX;
      points[drag].y = p.mouseY;
      
      doDraw();
    }
  };
  
};

new p5(sketch);

