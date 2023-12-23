//Handles color conversions and other functions

//Color conversion graph
var colorspaces = ['sRGB', 'RGB', 'HSV', 'HSL', 'CMYK', 'XYZ', 'Lab', 'Luv', 'HSLuv']; //All colorspaces handled by this script
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

