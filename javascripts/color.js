//Handles color conversions and other functions
//RGB will be provided in 0-1 format
//Sources:
// - https://en.wikipedia.org/wiki/SRGB

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
