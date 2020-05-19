/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Russell, Robert A. "Generalized Law of Sines." From MathWorld--A Wolfram Web Resource, created by Eric W. Weisstein.
// https://mathworld.wolfram.com/GeneralizedLawofSines.html 
const gsin = (K: number) => {
  if (K === 1) {
    return Math.sin;
  } else if (K === 0) {
    return (s) => s;
  } else if (K === -1) {
    return Math.sinh;
  } else if (K > 0) {
    const r = Math.sqrt(K);
    return (s) => {
      return Math.sin(s / r) / r;
    };
  } else { // k < 0
    const k = Math.sqrt(-K);
    return (s) => {
      return Math.sinh(s / k) / k;
    };
  }
};

const cosineLaw = (K: number) => {
  if (K === 0) {
    return (a: number, b: number, C: number): number => {
      return Math.sqrt( (a * a) + (b * b) - (2 * a * b * Math.cos(C)));
    };
  } else if (K > 0) {
    const r = 1 / Math.sqrt(K);
    return (a, b, C) => {
      return r * Math.acos( (Math.cos(a/r) * Math.cos(b/r)) + (Math.sin(a/r) * Math.sin(b/r) * Math.cos(C)) );
    };
  } else { // k < 0
    const k = 1 / Math.sqrt(-K);
    return (a, b, C) => {
      return k * Math.acosh( (Math.cosh(a/k) * Math.cosh(b/k)) - (Math.sinh(a/k) * Math.sinh(b/k) * Math.cos(C)) );
    };
  }
};

interface NonEulcidBase {
  gsin(s: number): number;
  cosineLaw(a, b, C): number;
}

interface NonEulcid extends NonEulcidBase {
  addVectors([r1, theta1], [r2, theta2]): [number, number];
}

const addVectors = (ne: NonEulcidBase) => {
  return ([r1, theta1], [r2, theta2]): [number, number] => {

    const R = Math.abs(theta2 - theta1); // Well that's probably correct in Euclidean space

    // Apply cosine law to calculate r
    const r = ne.cosineLaw(r1, r2, R);

    // Apply sine law to calculate theta
    const ratio = Math.sin(R) / ne.gsin(r);
    const R2 = ratio * ne.gsin(r2);

    // Get the angle theta from R2
    const theta = R2 - theta1; // Might even be correct apart from the sign

    return [r, theta];
  };
};

const create = (K: number): NonEulcid => {

  const ne: NonEulcidBase = {
    gsin: gsin(K),
    cosineLaw: cosineLaw(K)
  };

  return {
    addVectors: addVectors(ne),
    ...ne
  };
};

export default create;

