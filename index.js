var headY = 2;
var headX = 2;
var height= 30;
var width = 30;
var update = 100;
var increment = 2;

var tailY = [headY];
var tailX = [headX];
var foodY;
var foodX;
var moving;
var gameOver;
var dir = 0 // down = 0, up = 1, left = 2, right = 3
var int;

const move = () => {
  init();
  int = setInterval(loop, interval);


}

const init = () => {
  map();
  snake();
  food();
}

const map = () => {
  document.write('<table>');
  for(var y = 0; y < height; y++){
    document.write('<tr>');
    for( var x = 0; x < width; x++){
      if( x === 0 || x === width - 1 || y === 0 || y === height -1){
        document.write("<td class='borders' id= '"+ x + "-" + y + "'></td>");
      }else{
        document.write("<td class='arena' id= '"+ x + "-" + y + "'></td>");
      }
    }
    document.write('</tr>');

  }
  document.write('</table>');
}

move();
