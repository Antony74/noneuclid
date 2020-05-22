import p5 from 'p5';
import nonEuclidCreate from './noneuclid';

const rectRadius = 10;
let drag = 999;

const sketch = (p: p5): void => {

  const ne = nonEuclidCreate(0);

  const line = (pt1: p5.Vector, pt2: p5.Vector): void => {
    p.line(pt1.x, pt1.y, pt2.x, pt2.y);
  };

  const textAdjustment = (label): p5.Vector => (new p5.Vector()).set(-p.textWidth(label), p.textSize()).mult(0.5);

  const labelAngle = (label: string, pt1: p5.Vector, pt2: p5.Vector, pt3: p5.Vector): number => {

    const line1 = p5.Vector.sub(pt1, pt2);
    const line2 = p5.Vector.sub(pt3, pt2);

    const labelPosition = p5.Vector.add(line1,line2).setMag(20).add(pt2).add(textAdjustment(label));

    p.text(label, labelPosition.x, labelPosition.y);
    return line1.heading() - line2.heading();
  };

  const labelLine = (label: string, pt1: p5.Vector, pt2: p5.Vector, ptOpposite: p5.Vector): number => {

    const mid = p5.Vector.add(pt1, pt2).div(2);
    const line12 = p5.Vector.sub(pt1, pt2);
    const perp = line12.copy().rotate(p.HALF_PI).setMag(10);
    const pos1 = p5.Vector.add(mid, perp);
    const pos2 = p5.Vector.sub(mid, perp);
    const dist1 = p5.Vector.sub(pos1, ptOpposite).magSq();
    const dist2 = p5.Vector.sub(pos2, ptOpposite).magSq();
    
    const labelPosition = (dist1 > dist2 ? pos1 : pos2).add(textAdjustment(label));

    p.text(label, labelPosition.x, labelPosition.y);
    return line12.mag();
  };

  const points: p5.Vector[] = [
    (new p5.Vector()).set(500, 100),
    (new p5.Vector()).set(450, 300),
    (new p5.Vector()).set(300, 150),
  ];

  const doDraw = (): void => {
    p.background(200);

    // Draw points
    p.noStroke();
    p.fill(255, 0, 0, 128);
    
    points.forEach((point) => {
      p.rect(point.x, point.y, rectRadius, rectRadius);
    });

    // Draw lines
    p.stroke(0);
    p.strokeWeight(1);
    line(points[0], points[1]);
    line(points[1], points[2]);
    line(points[0], points[2]);

    // Label points
    p.fill(0);
    labelAngle('A', points[2], points[0], points[1]);
    labelAngle('B', points[0], points[1], points[2]);
    const C = labelAngle('C', points[1], points[2], points[0]);

    // Label lines
    const a = labelLine('a', points[1], points[2], points[0]);
    const b = labelLine('b', points[2], points[0], points[1]);
    labelLine('c', points[0], points[1], points[2]);

    // Write out what we know
    const Cabs = Math.abs(C);

    const aboutC = `C = ${Cabs.toFixed(2)} radians = ${p.degrees(Cabs).toFixed(0)} degrees`;
    p.text(aboutC, 10, 30);

    const abouta = `a = ${a.toFixed(0)} pixels`;
    p.text(abouta, 10, 50);

    const aboutb = `b = ${b.toFixed(0)} pixels`;
    p.text(aboutb, 10, 70);

    // Use cosine law to calculate c

    const c = ne.cosineLaw(a, b, C);

    const aboutc = `via cosine law, c = ${c.toFixed(0)} pixels`;
    p.text(aboutc, 10, 90);

    // Use unified sine law to calculate B
    const sineLawRatio = Math.sin(C) / ne.gsin(c);
    const B = Math.asin(sineLawRatio * ne.gsin(b));
    const Babs = Math.abs(B);

    const aboutRatio = `sine law ratio = ${sineLawRatio}`;
    p.text(aboutRatio, 10, 110);

    const aboutB = `via sine law, B = ${Babs.toFixed(2)} radians = ${p.degrees(Babs).toFixed(0)} degrees`;
    p.text(aboutB, 10, 130);

    const vecA = p5.Vector.sub(points[2], points[1]);

    p.strokeWeight(5);
    p.stroke(255, 0, 0);

    const vecC = p5.Vector.fromAngle(vecA.heading() + B).setMag(c);
    line(points[1], p5.Vector.add(points[1], vecC));
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

