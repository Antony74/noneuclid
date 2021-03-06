import p5 from 'p5';
import nonEuclidCreate from './noneuclid';

const sketch = (p: p5): void => {

  const mapx = (x): number => p.map(x, -p.TWO_PI, p.TWO_PI, 0, p.width);
  const mapy = (y): number => p.map(y, p.TWO_PI, -p.TWO_PI, 0, p.height);
  
  const line = (x1, y1, x2, y2): p5 => p.line(mapx(x1), mapy(y1), mapx(x2), mapy(y2));

  p.setup = (): void => {
    p.createCanvas(640, 480);
    p.rectMode(p.CENTER);
    p.noFill();

    p.background(230);

    p.colorMode(p.HSB);

    line(0, -7, 0, 7);
    line(-7, 0, 7, 0);

    const steps = 1000;

    for(let K = -steps; K <= steps; ++K) {

      const ne = nonEuclidCreate(K/steps);

      p.stroke(p.map(K, -steps, steps, 0, 255), 255, 255);
      p.beginShape();

      for(let x = -p.TWO_PI; x < p.TWO_PI; x += 0.01) {
        const y = ne.gsin(x);
        p.vertex(mapx(x), mapy(y));
      }

      p.endShape();

    }
  };

};

new p5(sketch);

