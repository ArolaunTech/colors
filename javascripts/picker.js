let colordisplay = document.getElementById("colorselect");
let hselect = document.getElementById("hselect");
let svpicker = document.getElementById("svpicker");
let backpicker = document.getElementById("backgroundpicker");
let finalcolordisplay = document.getElementById("colordisplay");

let colorhex = document.getElementById("colorhex");
let colorrgb = document.getElementById("colorrgb");
let colorhsv = document.getElementById("colorhsv");

let paletteedit = document.getElementById("paletteedit");

var h = 0;
var s = 0;
var v = 1;

var currentPalette = 1;
var oldPalette = 0;

function displayFinalColor() {
	let col = graph['HSV']['sRGB'][0]([h, s, v]);
	let hex = "#" + 
		(parseInt(col[0]*255)+256).toString(16).slice(1) + 
		(parseInt(col[1]*255)+256).toString(16).slice(1) + 
		(parseInt(col[2]*255)+256).toString(16).slice(1);

	finalcolordisplay.style.background = hex;
	colorhex.innerText = hex;
	colorrgb.innerText = "rgb(" + parseInt(255 * col[0]) + " " + parseInt(255*col[1]) + " " + parseInt(255*col[2]) + ")";
	colorhsv.innerHTML = "hsv(" + h + "&deg; " + Math.round(100*s) + "% " + Math.round(100*v) + "%)";

	document.getElementById("palette" + currentPalette).style.background = hex;

	let palettetext = document.getElementById("palettehex" + currentPalette);
	palettetext.innerText = hex;

	if (brightsRGB(col)) {
		palettetext.style.color = "#000";
	} else {
		palettetext.style.color = "#fff";
	}
}

function setColorInternal() {
	let hvalue = hselect.value;
	h = parseInt(hvalue);
	let col = graph['HSV']['sRGB'][0]([h, 1, 1]);

	colordisplay.style.fill = "#" + 
		(parseInt(col[0]*255)+256).toString(16).slice(1) + 
		(parseInt(col[1]*255)+256).toString(16).slice(1) + 
		(parseInt(col[2]*255)+256).toString(16).slice(1);

	displayFinalColor();
}

function setColor(event) {
	findMousePosAndState(event);

	if (mouseDown) {
		setColorInternal();
	}
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

function selectPalette(event) {
	document.getElementById("palette" + oldPalette).classList.remove("paletteselected");
	document.getElementById("palette" + currentPalette).classList.add("paletteselected");

	paletteedit.innerText = "Editing color " + currentPalette;
}

setColorInternal();

hselect.addEventListener("mousemove", setColor);
hselect.addEventListener("mousedown", setColor);
hselect.addEventListener("mouseup", setColorInternal);
backpicker.addEventListener("mousemove", moveSVPicker);
backpicker.addEventListener("mousedown", moveSVPicker);

document.getElementById("palette1").addEventListener("mousedown", (e)=>{
	oldPalette=currentPalette;
	currentPalette=1;
	selectPalette(e);
});
document.getElementById("palette2").addEventListener("mousedown", (e)=>{
	oldPalette=currentPalette;
	currentPalette=2;
	selectPalette(e);
});
document.getElementById("palette3").addEventListener("mousedown", (e)=>{
	oldPalette=currentPalette;
	currentPalette=3;
	selectPalette(e);
});
document.getElementById("palette4").addEventListener("mousedown", (e)=>{
	oldPalette=currentPalette;
	currentPalette=4;
	selectPalette(e);
});
document.getElementById("palette5").addEventListener("mousedown", (e)=>{
	oldPalette=currentPalette;
	currentPalette=5;
	selectPalette(e);
});