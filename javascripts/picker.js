let colordisplay = document.getElementById("colorselect");
let hselect = document.getElementById("hselect");
let svpicker = document.getElementById("svpicker");
let backpicker = document.getElementById("backgroundpicker");
let finalcolordisplay = document.getElementById("colordisplay");

let colorhex = document.getElementById("colorhex");
let colorrgb = document.getElementById("colorrgb");
let colorhsv = document.getElementById("colorhsv");

var h = 0;
var s = 0;
var v = 1;

function displayFinalColor() {
	let col = graph['HSV']['sRGB'][0]([h, s, v]);
	let hex = "#" + 
		(parseInt(col[0]*255)+256).toString(16).slice(1) + 
		(parseInt(col[1]*255)+256).toString(16).slice(1) + 
		(parseInt(col[2]*255)+256).toString(16).slice(1);

	finalcolordisplay.style.background = hex;
	colorhex.innerText = hex;
	colorrgb.innerText = "rgb(" + Math.round(255 * col[0]) + " " + Math.round(255*col[1]) + " " + Math.round(255*col[2]) + ")";
	colorhsv.innerHTML = "hsv(" + h + "&deg; " + Math.round(100*s) + "% " + Math.round(100*v) + "%)";
}

function setColor() {
	let hvalue = hselect.value;
	h = parseInt(hvalue);
	let col = graph['HSV']['sRGB'][0]([h, 1, 1]);

	colordisplay.style.fill = "#" + 
		(parseInt(col[0]*255)+256).toString(16).slice(1) + 
		(parseInt(col[1]*255)+256).toString(16).slice(1) + 
		(parseInt(col[2]*255)+256).toString(16).slice(1);

	displayFinalColor();
}

function moveSVPicker(event) {
	findMousePosAndState(event);

	if (mouseDown) {
		let backpickerSize = backpicker.getBoundingClientRect();
		let x = (mouseX - backpickerSize.x)/backpickerSize.width;
		let y = (mouseY - backpickerSize.y)/backpickerSize.height;
		
		svpicker.style.cx = 100*x;
		svpicker.style.cy = 67*y;

		s = x;
		v = 1 - y;

		displayFinalColor();
	}
}

setColor();

hselect.addEventListener("mousemove", setColor);
backpicker.addEventListener("mousemove", moveSVPicker);
backpicker.addEventListener("mousedown", moveSVPicker);