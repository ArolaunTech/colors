//Handles color conversions and other functions
//RGB will be provided in 0-1 format

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
