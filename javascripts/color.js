//Handles color conversions and other functions

//Color conversion graph
var colorspaces = ['sRGB', 'HSV', 'HSL', 'CMYK', 'XYZ', 'Lab', 'Luv', 'HSLuv']; //All colorspaces handled by this script
var graph = {
  
};

for (var i = 0; i < colorspaces.length; i++) {
  graph[colorspaces[i]] = {};
  for (var j = 0; j < colorspaces.length; j++) {
    if (i == j) {
      continue;
    }
    graph[colorspaces[i]][colorspaces[j]] = [];
  }
}
console.log(graph);

//Color conversion functions
function linRtosR(r) {
  //Helper function for RGBtosRGB
  if (r < 0.0031308) {
    return 12.92*r;
  }
  return 1.055*Math.pow(r, 5/12)-0.055;
}

function sRtolinR(r) {
  //Helper function for sRGBtoRGB
  if (r < 0.04045) {
    return r/12.92;
  }
  return Math.pow((r + 0.055)/1.055, 12/5);
}

function RGBtosRGB(col) { //Turn linear RGB into sRGB
  return [linRtosR(col[0]), linRtosR(col[1]), linRtosR(col[2])];
}

function sRGBtoRGB(col) { //Turns sRGB into linear RGB
  return [sRtolinR(col[0]), sRtolinR(col[1]), sRtolinR(col[2])];
}

graph['sRGB']['XYZ'].push(function(col) {
  var linrgb = sRGBtoRGB(col);
  return [0.4124*linrgb[0] + 0.3576*linrgb[1] + 0.1805*linrgb[2], 0.2126*linrgb[0] + 0.7152*linrgb[1] + 0.0722*linrgb[2] , 0.0193*linrgb[0] + 0.1192*linrgb[1] + 0.9505*linrgb[2]];
});

graph['XYZ']['sRGB'].push(function(col) {
  var linrgb = [3.2406255*col[0] - 1.537208*col[1] - 0.4986286*col[2], -0.9689307*col[0] + 1.8757561*col[1] + 0.0415175*col[2], 0.0557101*col[0] - 0.2040211*col[1] + 1.0569959*col[2]];
  return RGBtosRGB(linrgb);
});

graph['sRGB']['HSV'].push(function(col) {
  var cmax = Math.max(...col);
  var cmin = Math.min(...col);
  var delta = cmax-cmin;

  var v = cmax;
  if (cmax == 0) {
    var s = 0;
  } else {
    var s = delta/cmax;
  }
  if (delta == 0) {
    var h = 0;
  } else if (cmax == col[0]) {
    var h = ((col[1]-col[2])/delta + 6)%6;
  } else if (cmax == col[1]) {
    var h = 2 + (col[2]-col[0])/delta;
  } else {
    var h = 4 + (col[0]-col[1])/delta;
  }
  h *= 60;
  return [h, s, v];
}
