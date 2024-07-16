var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

function findMouseState(event) {
	var flags = event.buttons !== undefined ? event.buttons : event.which;
	mouseDown = (flags & 1) === 1;
}

function findMousePosAndState(event) {
	var flags = event.buttons !== undefined ? event.buttons : event.which;
	mouseDown = (flags & 1) === 1;

	mouseX = event.pageX;
	mouseY = event.pageY;
}

document.addEventListener("mousedown", findMouseState);
//document.addEventListener("mousemove", findMousePosAndState);
document.addEventListener("mouseup", findMouseState);