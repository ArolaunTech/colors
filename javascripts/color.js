//Handles color conversions and other functions
//RGB will be provided in 0-1 format
//Sources:
// - https://en.wikipedia.org/wiki/SRGB
// - https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
// - https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
// - https://www.rapidtables.com/convert/color/rgb-to-hsl.html
// - https://www.rapidtables.com/convert/color/hsl-to-rgb.html
// - https://www.rapidtables.com/convert/color/rgb-to-hsv.html
// - https://www.rapidtables.com/convert/color/hsv-to-rgb.html

function linRtosR(r) {
  //Helper function for linRGBtosRGB(r, g, b)
  if (r < 0.0031308) {
    return 12.92*r;
  }
  return 1.055*Math.pow(r, 5/12)-0.055;
}

function linRGBtosRGB(rgb) {
  //Converts linear RGB to sRGB
  return [linRtosR(rgb[0]), linRtosR(rgb[1]), linRtosR(rgb[2])];
}

function sRtolinR(r) {
  //Helper function for sRGBtolinRGB(r, g, b)
  if (r < 0.04045) {
    return r/12.92;
  }
  return Math.pow((r+0.055)/1.055, 12/5);
}

function sRGBtolinRGB(rgb) {
  //Converts sRGB to linear RGB
  return [sRtolinR(rgb[0]), sRtolinR(rgb[1]), sRtolinR(rgb[2])];
}

function linRGBtoXYZ(rgb) {
  //Converts linear RGB to CIE XYZ (D65 whitepoint)
  return [0.4124*rgb[0] + 0.3576*rgb[1] + 0.1805*rgb[2], 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2], 0.0192*rgb[0] + 0.1192*rgb[1] + 0.9505*rgb[2]];
}

function XYZtolinRGB(xyz) {
  //Converts CIE XYZ (D65 whitepoint) to linear RGB
  return [3.2406255*xyz[0] - 1.537208*xyz[1] - 0.4986286*xyz[2], -0.9689307*xyz[0] + 1.8757561*xyz[1] + 0.0415175*xyz[2], 0.0557101*xyz[0] - 0.2040211*xyz[1] + 1.0569959*xyz[2]];
}

function sRGBtoCMYK(rgb) {
  //Convert sRGB to CMYK
  var k = 1-Math.max(...rgb);
  if (k == 1) {
    return [0,0,0,1];
  }
  return [(1-rgb[0]-k)/(1-k), (1-rgb[1]-k)/(1-k), (1-rgb[2]-k)/(1-k), k];
}

function CMYKtosRGB(cmyk) {
  //Convert CMYK to sRGB
  return [(1-cmyk[0])*(1-cmyk[3]), (1-cmyk[1])*(1-cmyk[3]), (1-cmyk[2])*(1-cmyk[3])];
}

function sRGBtoHSL(rgb) {
  //Convert sRGB to HSL
  var cmax = Math.max(...rgb);
  var cmin = Math.min(...rgb);
  var delta = cmax-cmin;
  var l = (cmax + cmin)/2;
  if (delta == 0) {
    return [0, 0, l];
  }
  var s = delta/(1 - Math.abs(2*l - 1));
  if (cmax == rgb[0]) {
    return [60 * (((rgb[1]-rgb[2])/delta + 6)%6), s, l];
  }
  if (cmax == rgb[1]) {
    return [60 * ((rgb[2] - rgb[0])/delta + 2), s, l];
  }
  if (cmax == rgb[2]) {
    return [60 * ((rgb[0] - rgb[1])/delta + 4), s, l];
  }
}

function HSLtosRGB(hsl) {
  //Convert HSL to sRGB
  var c = (1 - Math.abs(2*hsl[2] - 1)) * hsl[1];
  var m = hsl[2] - c/2;
  var x = c * (1 - Math.abs((hsl[0]/60)%2 - 1));
  if (hsl[0] < 60) {
    return [c+m, x+m, m];
  }
  if (hsl[0] < 120) {
    return [x+m, c+m, m];
  }
  if (hsl[0] < 180) {
    return [m, c+m, x+m];
  }
  if (hsl[0] < 240) {
    return [m, x+m, c+m];
  }
  if (hsl[0] < 300) {
    return [x+m, m, c+m];
  }
  return [c+m, m, x+m];
}

function sRGBtoHSV(rgb) {
  //Convert sRGB to HSV
  var cmax = Math.max(...rgb);
  var cmin = Math.min(...rgb);
  var delta = cmax-cmin;
  if (delta == 0) {
    return [0, 0, cmax];
  }
  var s = delta/cmax;
  if (cmax == rgb[0]) {
    return [60 * (((rgb[1]-rgb[2])/delta + 6)%6),s,cmax];
  }
  if (cmax == rgb[1]) {
    return [60 * ((rgb[2] - rgb[0])/delta + 2) ,s,cmax];
  }
  if (cmax == rgb[2]) {
    return [60 * ((rgb[0] - rgb[1])/delta + 4),s,cmax];
  }
}

function HSVtosRGB(hsv) {
  //Convert HSV to sRGB
  var c = hsv[1] * hsv[2];
  var m = hsv[2] - c;
  var x = c * (1 - Math.abs((hsv[0]/60)%2 - 1));
  if (hsv[0] < 60) {
    return [c+m, x+m, m];
  }
  if (hsv[0] < 120) {
    return [x+m, c+m, m];
  }
  if (hsv[0] < 180) {
    return [m, c+m, x+m];
  }
  if (hsv[0] < 240) {
    return [m, x+m, c+m];
  }
  if (hsv[0] < 300) {
    return [x+m, m, c+m];
  }
  return [c+m, m, x+m];
}
