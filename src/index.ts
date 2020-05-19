import p5 from 'p5';
const rectRadius = 10;
let drag = 999;

const sketch = (p: p5): void => {

  const line = (pt1: p5.Vector, pt2: p5.Vector): void => {
    p.line(pt1.x, pt1.y, pt2.x, pt2.y);
  };

  const labelAngle = (label: string, points: p5.Vector[], index: number): void => {

    const point = points[index];

    const sum: p5.Vector = points.reduce(
      (acc, vec) => acc.add(vec).sub(point),
      new p5.Vector()
    );

    const textAdjustment = (new p5.Vector()).set(-p.textWidth(label), p.textSize()).mult(0.5);

    const labelPosition = sum.setMag(20).add(point).add(textAdjustment);

    p.text(label, labelPosition.x, labelPosition.y);
  };

  const points: p5.Vector[] = [
    (new p5.Vector()).set(300, 150),
    (new p5.Vector()).set(500, 100),
    (new p5.Vector()).set(450, 300)
  ];

  const doDraw = (): void => {
    p.background(200);

    p.noStroke();
    p.fill(255, 0, 0, 128);
    
    points.forEach((point) => {
      p.rect(point.x, point.y, rectRadius, rectRadius);
    });

    p.stroke(0);
    line(points[0], points[1]);
    line(points[1], points[2]);
    line(points[0], points[2]);

    p.fill(0);
    labelAngle('A', points, 0);
    labelAngle('B', points, 1);
    labelAngle('C', points, 2);
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

