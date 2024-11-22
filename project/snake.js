var bw = 400;
var bh = 400;
var p = -0.5
var canvas = document.getElementById("gameCanvas")
var context = canvas.getContext("2d");
function drawGrid(){
    context.lineWidth = 0.5;
    for (var x = 0; x <= bw; x += 20) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 20) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "white";
    context.stroke();
}

drawGrid();


let snake = []


function drawSnake() {

}