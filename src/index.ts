import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(640, 480);
  }
    
  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  }
}

console.log('trying');
new p5(sketch, document.getElementById('sketch'));

