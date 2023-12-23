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
    graph[colorspaces[i]][colorspaces[j]] = '';
  }
}
console.log(graph);
